import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as puppeteer from "puppeteer";

import { checkResultChanged, scheduleToSeconds } from "./utils";
import { workers } from "./workers";
admin.initializeApp();
const db = admin.firestore();

export async function urlToPdf(resultId: string, url: string) {
  try {
    // Launch a headless browser.
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("Browser launched");
    const page = await browser.newPage();
    console.log("New page created");

    // Navigate to the URL.
    await page.goto(url, { waitUntil: "networkidle2" });
    console.log("Page loaded");

    // Generate the PDF.
    const pdfPath = path.join(os.tmpdir(), "page.pdf");
    await page.pdf({ path: pdfPath, format: "A4" });
    console.log("PDF generated");

    // Upload the PDF to Firebase Storage.
    const bucket = admin.storage().bucket();
    const storagePath = `pdfs/${resultId}.pdf`;
    await bucket.upload(pdfPath, {
      destination: storagePath,
      metadata: {
        contentType: "application/pdf",
        metadata: { firebaseStorageDownloadTokens: Date.now() },
      },
    });
    console.log("PDF uploaded");

    // Delete the local PDF file.
    fs.unlinkSync(pdfPath);
    console.log("Local file deleted");

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

export const jobScheduler = functions
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    // Consistent timestamp
    const jobStart = admin.firestore.Timestamp.now();
    console.log({ jobStart });

    // Query all documents ready to perform
    const query = db
      .collection("jobs")
      .where("nextRunTime", "<=", jobStart)
      .where("status", "==", "active");

    const jobDocs = await query.get();

    // Jobs to execute concurrently.
    const jobs: Promise<any>[] = [];

    // Loop over documents and push job.
    jobDocs.forEach((snapshot) => {
      const { query, schedule, id, userId } = snapshot.data();
      // update status to running
      snapshot.ref.update({ status: "running" }).then(() => {
        query.sources.forEach((source: dataSource) => {
          // Create a new job for each source.
          const job = workers[source](query)
            .then((results) => {
              results.forEach((result) => {
                const now = admin.firestore.Timestamp.now();

                // check if result already exists, if not create it, if so update it
                const resultRef = db.collection("results").doc(result.id);
                resultRef.get().then(async (doc) => {
                  if (doc.exists) {
                    if (checkResultChanged(result, doc)) {
                      const pdfUrl = await urlToPdf(result.id, result.url);

                      // update result
                      await resultRef.update({
                        ...result,
                        updatedTime: now,
                        pdfUrl,
                      });
                    }
                  } else {
                    const pdfUrl = await urlToPdf(result.id, result.url);

                    // create result
                    await resultRef.set({
                      ...result,
                      createdTime: now,
                      updatedTime: now,
                      jobId: id,
                      userId,
                      pdfUrl,
                    });
                  }
                });
              });
            })
            .catch((error) => {
              // handle error
              console.error(error);
              snapshot.ref.update({ status: "failed" });
            })
            .finally(() => {
              console.log(`Finished ${source} job for job ${id}`);
              // update status then next run time
              snapshot.ref.update({
                status: "active",
                lastRunTime: jobStart,
                nextRunTime: admin.firestore.Timestamp.fromDate(
                  new Date(Date.now() + scheduleToSeconds(schedule) * 1000)
                ),
              });
            });

          // Push job to array.
          jobs.push(job);
        });
      });
    });

    // Execute all jobs concurrently
    return await Promise.all(jobs);
  });
