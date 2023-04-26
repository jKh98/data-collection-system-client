import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as puppeteer from "puppeteer";

import { checkResultChanged, scheduleToSeconds } from "./utils";
import { workers } from "./workers";

type snapshotType =
  admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>;

interface BuildLocalJobArgs {
  id: string;
  userId: string;
  source: dataSource;
  query: SearchQuery;
}

interface BuildJobArgs {
  snapshot: snapshotType;
  jobStart: admin.firestore.Timestamp;
}

admin.initializeApp();

const db = admin.firestore();

const PUPPETEER_TIMEOUT = 120000;

// browser singleton
let browser: puppeteer.Browser | null = null;

export const initBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      // necessary for running on firebase functions
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
  }
};

export const killBrowser = async () => {
  if (browser) {
    await browser.close();
    browser = null;
  }
};

export async function urlToPdf(resultId: string, url: string, jobId: string) {
  try {
    if (!browser) return null;

    const page = await browser.newPage();

    // Navigate to the URL.
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: PUPPETEER_TIMEOUT,
    });

    // Generate the PDF.
    const pdfPath = path.join(os.tmpdir(), `${resultId}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: false,
      timeout: PUPPETEER_TIMEOUT,
    });
    await page.close();

    // Upload the PDF to Firebase Storage.
    const bucket = admin.storage().bucket();
    const storagePath = `${jobId}/${resultId}.pdf`;
    await bucket.upload(pdfPath, {
      destination: storagePath,
      metadata: {
        contentType: "application/pdf",
        metadata: { firebaseStorageDownloadTokens: Date.now() },
      },
    });

    // Delete the local PDF file.
    fs.unlinkSync(pdfPath);

    // Return the URL of the uploaded PDF.
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(storagePath)}?alt=media&token=${Date.now()}`;

    return downloadUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const buildLocalJob = async (args: BuildLocalJobArgs) => {
  const { id, userId, source, query } = args;
  try {
    const results = await workers[source](query);
    await Promise.all(
      results.map(async (result) => {
        const now = admin.firestore.Timestamp.now();

        // check if result already exists, if not create it, if so update it
        const resultRef = db.collection("results").doc(result.id);
        const doc = await resultRef.get();
        const shouldUpdate = checkResultChanged(result, doc) && doc.exists;
        const shouldAdd = !doc.exists;
        let pdfUrl = null;

        if (shouldUpdate || shouldAdd) {
          pdfUrl = await urlToPdf(result.id, result.url, id);
        }

        if (shouldUpdate) {
          // update result
          const obj = { ...result, updatedTime: now, pdfUrl };
          await resultRef.update(obj);
        } else if (shouldAdd) {
          // create result
          const obj = {
            ...result,
            createdTime: now,
            updatedTime: now,
            jobId: id,
            userId,
            pdfUrl,
          };

          await resultRef.set(obj);
        }
      })
    );
  } catch (e) {
    console.error(`Error in ${source} job for job ${id}: ${e}`);
  } finally {
    console.log(`Finished ${source} job for job ${id}`);
  }
};

export const buildJob = async (args: BuildJobArgs) => {
  const { snapshot, jobStart } = args;
  const { id, userId, schedule, query } = snapshot.data() as SearchJob;

  try {
    // update status to running
    await snapshot.ref.update({ status: "running" });

    // Execute all local jobs concurrently
    await Promise.all(
      query.sources.map(
        async (source: dataSource) =>
          await buildLocalJob({ id: id!, userId, source, query })
      )
    );
  } catch (error) {
    console.error(`Error in job ${snapshot.id}: ${error}`);
    snapshot.ref.update({ status: "failed" });
  } finally {
    // update status then next run time
    const nextRunTime = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + scheduleToSeconds(schedule) * 1000)
    );

    await snapshot.ref.update({
      status: "active",
      lastRunTime: jobStart,
      nextRunTime,
    });
  }
};

export const jobScheduler = functions
  .runWith({ memory: "4GB", timeoutSeconds: 540 })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    try {
      // Init browser
      await initBrowser();

      // Consistent timestamp
      const jobStart = admin.firestore.Timestamp.now();
      console.log(`Starting job at ${jobStart.toDate()}`);

      // Query all documents ready to perform
      const query = db
        .collection("jobs")
        .where("nextRunTime", "<=", jobStart)
        .where("status", "==", "active");

      const jobDocs = await query.get();
      console.log(`Found ${jobDocs.size} jobs to run`);

      // Jobs to execute concurrently.
      const jobs: Promise<any>[] = [];

      // Loop over documents and push jobs to array.
      jobDocs.forEach((snapshot) => {
        // Push job to array.
        jobs.push(buildJob({ snapshot, jobStart }));
      });

      console.log(`Executing ${jobs.length} jobs...`);

      // Execute all jobs concurrently
      await Promise.all(jobs);

      console.log("All jobs executed");

      // Kill browser
      await killBrowser();

      console.log("Browser killed");

      return null;
    } catch (error) {
      console.error(`Error in job scheduler: ${error}`);
      return null;
    }
  });
