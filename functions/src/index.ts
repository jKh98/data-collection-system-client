import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as puppeteer from "puppeteer";

import { checkResultChanged, scheduleToSeconds, sourceToLabel } from "./utils";
import { workers } from "./workers";

type snapshotType =
  admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>;

interface BuildLocalJobArgs {
  id: string;
  userId: string;
  fcmToken: string;
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

const getUserFcmToken = async (userId: string) => {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  const fcmToken = userDoc.data()?.fcmToken;

  return fcmToken;
};

export const buildLocalJob = async (args: BuildLocalJobArgs) => {
  const { id, userId, source, query, fcmToken } = args;

  try {
    let added = 0,
      updated = 0;
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
          updated++;
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
          added++;
        }
      })
    );

    if ((added || updated) && fcmToken) {
      const title = `New results for job ${id}`;
      const finalSource = sourceToLabel(source);
      const body = `Added ${added} new results and updated ${updated} results from ${finalSource}`;
      const type = "info";
      const message = {
        notification: { title, body },
        data: { type },
        token: fcmToken,
      };

      await admin.messaging().send(message);
    }

    return { added, updated };
  } catch (e) {
    console.error(`Error in ${source} job for job ${id}: ${e}`);

    return { added: 0, updated: 0 };
  } finally {
    console.log(`Finished ${source} job for job ${id}`);
  }
};

export const buildJob = async (args: BuildJobArgs) => {
  const { snapshot, jobStart } = args;
  const { id, userId, schedule, query } = snapshot.data() as SearchJob;
  const fcmToken = await getUserFcmToken(userId);

  try {
    // update status to running
    await snapshot.ref.update({ status: "running" });

    // Execute all local jobs concurrently
    const results = await Promise.all(
      query.sources.map(
        async (source: dataSource) =>
          await buildLocalJob({ id: id!, userId, source, query, fcmToken })
      )
    );

    const didAddOrUpdate = results.reduce(
      (acc, curr) => {
        return {
          added: acc.added + curr.added,
          updated: acc.updated + curr.updated,
        };
      },
      { added: 0, updated: 0 }
    );

    if (fcmToken) {
      const title = `Finished job ${id}`;
      const body = `Added ${didAddOrUpdate.added} new results and updated ${didAddOrUpdate.updated} results`;
      const type = "success";
      const message = {
        notification: { title, body },
        data: { type },
        token: fcmToken,
      };

      await admin.messaging().send(message);
    }
  } catch (error) {
    console.error(`Error in job ${snapshot.id}: ${error}`);
    await snapshot.ref.update({ status: "failed" });

    if (fcmToken) {
      const title = `Error in job ${id}`;
      const body = `Job failed with error: ${error}`;
      const type = "error";
      const message = {
        notification: { title, body },
        data: { type },
        token: fcmToken,
      };

      await admin.messaging().send(message);
    }
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
