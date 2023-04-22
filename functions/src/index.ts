import axios from "axios";
import { createHash } from "crypto";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
admin.initializeApp();
const db = admin.firestore();

const newsApiKey = "852022f50f004f49b38b2884089813a9";
const twitterApiKey = "your_twitter_api_key";
const redditApiKey = "your_reddit_api_key";

export async function searchNewsApi(
  query: SearchQuery
): Promise<SearchResult[]> {
  const { q, advancedQuery } = query;
  const { newsApi } = advancedQuery || {};
  const {
    q: newsApiQ,
    sources: newsApiSources,
    domains,
    excludeDomains,
    from,
    to,
    language,
  } = newsApi || {};
  const newsApiEndpoint = "https://newsapi.org/v2/everything";

  const response = await axios.get(newsApiEndpoint, {
    params: {
      q: newsApiQ || q,
      sources: newsApiSources?.join(","),
      domains: domains?.join(","),
      excludeDomains: excludeDomains?.join(","),
      from,
      to,
      language,
      apiKey: newsApiKey,
    },
  });

  const articles = response.data.articles;

  return articles.map(
    (article: any) =>
      ({
        id: createHash("md5").update(article.url).digest("hex"),
        source: "newsApi",
        title: article.title,
        content: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
      } as SearchResult)
  );
}

export async function searchTwitterApi(
  query: SearchQuery
): Promise<SearchResult[]> {
  const { q, advancedQuery } = query;
  const { twitterApi } = advancedQuery || {};
  const {
    query: twitterApiQuery,
    max_results,
    expansions,
    "tweet.fields": tweetFields,
    "user.fields": userFields,
  } = twitterApi || {};
  const twitterApiEndpoint = "https://api.twitter.com/2/tweets/search/recent";

  const response = await axios.get(twitterApiEndpoint, {
    headers: {
      Authorization: `Bearer ${twitterApiKey}`,
    },
    params: {
      query: twitterApiQuery || q,
      max_results,
      expansions: expansions?.join(","),
      "tweet.fields": tweetFields?.join(","),
      "user.fields": userFields?.join(","),
    },
  });

  const tweets = response.data.data;

  return tweets.map(
    (tweet: any) =>
      ({
        id: createHash("md5").update(tweet.id).digest("hex"),
        source: "twitterApi",
        title: tweet.text,
        content: tweet.text,
        url: `https://twitter.com/${tweet.author_id}/status/${tweet.id}`,
        publishedAt: tweet.created_at,
      } as SearchResult)
  );
}

export async function searchRedditApi(
  query: SearchQuery
): Promise<SearchResult[]> {
  const { q, advancedQuery } = query;
  const { redditApi } = advancedQuery || {};
  const { q: redditApiQuery, subreddit, t, limit } = redditApi || {};
  const redditApiEndpoint = `https://www.reddit.com/r/${
    subreddit || "all"
  }/search.json`;

  const response = await axios.get(redditApiEndpoint, {
    params: {
      q: redditApiQuery || q,
      t,
      limit,
    },
    headers: {
      Authorization: `Bearer ${redditApiKey}`,
      "User-Agent": "my-bot/0.0.1",
    },
  });

  const posts = response.data.data.children;

  return posts.map(
    (post: any) =>
      ({
        id: createHash("md5").update(post.data.id).digest("hex"),
        source: "redditApi",
        title: post.data.title,
        content: post.data.selftext,
        url: post.data.url,
        publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
      } as SearchResult)
  );
}

// Business logic for named tasks. Function name should match worker field on task document.
const workers = {
  newsApi: searchNewsApi,
  twitterApi: searchTwitterApi,
  redditApi: searchRedditApi,
};

const scheduleToSeconds = (schedule: Schedule) => {
  const { interval, unit } = schedule;

  switch (unit) {
    case "minutes":
      return interval * 60;
    case "hours":
      return interval * 60 * 60;
    case "days":
      return interval * 60 * 60 * 24;
    default:
      return 0;
  }
};

export const jobScheduler = functions
  .runWith({ memory: "2GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    // Consistent timestamp
    const now = admin.firestore.Timestamp.now();
    console.log({ now });

    // Query all documents ready to perform
    const query = db
      .collection("jobs")
      .where("nextRunTime", "<=", now)
      .where("status", "==", "active");

    const jobDocs = await query.get();

    // Jobs to execute concurrently.
    const jobs: Promise<any>[] = [];

    // Loop over documents and push job.
    jobDocs.forEach((snapshot) => {
      const { query, schedule, id } = snapshot.data();
      // update status to running
      snapshot.ref.update({ status: "running" });

      query.sources.forEach((source: dataSource) => {
        // Create a new job for each source.
        const job = workers[source](query)
          .then((results) => {
            results.forEach((result) => {
              // check if result already exists, if not create it, if so update it
              const resultRef = db.collection("results").doc(result.id);
              resultRef.get().then((doc) => {
                if (doc.exists) {
                  // update result
                  resultRef.update({
                    ...result,
                    updatedTime: admin.firestore.Timestamp.now(),
                  });
                } else {
                  // create result
                  resultRef.set({
                    ...result,
                    createdTime: admin.firestore.Timestamp.now(),
                    updatedTime: admin.firestore.Timestamp.now(),
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
              lastRunTime: now,
              nextRunTime: admin.firestore.Timestamp.fromDate(
                new Date(Date.now() + scheduleToSeconds(schedule) * 1000)
              ),
            });
          });

        // Push job to array.
        jobs.push(job);
      });
    });

    // Execute all jobs concurrently
    return await Promise.all(jobs);
  });
