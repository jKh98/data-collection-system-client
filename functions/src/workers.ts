import axios from "axios";
import { createHash } from "crypto";

const newsApiKey = "852022f50f004f49b38b2884089813a9";
const twitterApiKey = "your_twitter_api_key";

async function searchNewsApi(query: SearchQuery): Promise<SearchResult[]> {
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
        desctiption: article.description,
        content: article.content,
        url: article.url,
        publishedAt: article.publishedAt,
      } as SearchResult)
  );
}

async function searchTwitterApi(query: SearchQuery): Promise<SearchResult[]> {
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
        desctiption: tweet.text,
        content: tweet.text,
        url: `https://twitter.com/${tweet.author_id}/status/${tweet.id}`,
        publishedAt: tweet.created_at,
      } as SearchResult)
  );
}

async function searchRedditApi(query: SearchQuery): Promise<SearchResult[]> {
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
  });

  const posts = response.data.data.children;

  return posts.map(
    (post: any) =>
      ({
        id: createHash("md5").update(post.data.id).digest("hex"),
        source: "redditApi",
        title: post.data.title,
        desctiption: post.data.selftext,
        content: post.data.selftext,
        url: post.data.url,
        publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
      } as SearchResult)
  );
}

// Business logic for named tasks. Function name should match worker field on task document.
export const workers = {
  newsApi: searchNewsApi,
  twitterApi: searchTwitterApi,
  redditApi: searchRedditApi,
};
