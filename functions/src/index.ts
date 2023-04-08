import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();
const db = admin.firestore();

const callNewsApi = async (job: SearchQuery) => {
  // Do something
};

const callTwitterApi = async (job: SearchQuery) => {
  // Do something
};

const callRedditApi = async (job: SearchQuery) => {
  // Do something
};

// Business logic for named tasks. Function name should match worker field on task document.
const workers = {
  newsApi: callNewsApi,
  twitterApi: callTwitterApi,
  redditApi: callRedditApi,
};

export const taskRunner = functions
  .runWith({ memory: "2GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    // Consistent timestamp
    const now = admin.firestore.Timestamp.now();
    console.log({ now });

    // Query all documents ready to perform
    const query = db.collection("jobs");
    // .where("nextRunTime", "<=", now)
    // .where("status", "==", "active");

    const jobDocs = await query.get();

    // Jobs to execute concurrently.
    const jobs: Promise<any>[] = [];

    // Loop over documents and push job.
    jobDocs.forEach((snapshot) => {
      const { query } = snapshot.data();
      query.sources.forEach((source: dataSource) => {
        // Create a new job for each source.
        const job = workers[source](query)
          .then(() => {
            snapshot.ref.update({ status: "active" });
          })
          .catch(() => {
            snapshot.ref.update({ status: "error" });
          });

        // Push job to array.
        jobs.push(job);
      });
    });

    // Execute all jobs concurrently
    return await Promise.all(jobs);
  });
