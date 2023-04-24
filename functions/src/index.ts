import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { checkResultChanged, scheduleToSeconds } from "./utils";
import { workers } from "./workers";
admin.initializeApp();
const db = admin.firestore();

export const jobScheduler = functions
  .runWith({ memory: "2GB" })
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
                resultRef.get().then((doc) => {
                  if (doc.exists) {
                    if (checkResultChanged(result, doc)) {
                      // update result
                      resultRef.update({ ...result, updatedTime: now });
                    }
                  } else {
                    // create result
                    resultRef.set({
                      ...result,
                      createdTime: now,
                      updatedTime: now,
                      jobId: id,
                      userId,
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
