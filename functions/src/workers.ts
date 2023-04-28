import axios from "axios";
import { config } from "dotenv";

import { auth } from "./auth";
import { idToHash } from "./utils";

config();

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
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  const articles = response.data.articles;

  return articles.map(
    (article: any) =>
      ({
        id: idToHash(article.url),
        source: "newsApi",
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
      } as SearchResult)
  );
}

async function searchTwitterApi(query: SearchQuery): Promise<SearchResult[]> {
  const { q, advancedQuery } = query;
  const { twitterApi } = advancedQuery || {};
  const { q: twitterApiQuery, count, result_type, until } = twitterApi || {};

  const twitterApiEndpoint = "https://api.twitter.com/1.1/search/tweets.json";

  const utf8_urlEncoded_q = encodeURIComponent(twitterApiQuery ?? q);

  const params = new URLSearchParams();
  params.append("q", utf8_urlEncoded_q);
  params.append("count", (count ?? 100).toString());
  params.append("result_type", result_type ?? "recent");
  params.append("until", until ?? "");

  const finalUrl = `${twitterApiEndpoint}?${params.toString()}`;

  console.log(params.toString());
  console.log(auth({ method: "GET", url: `${twitterApiEndpoint}?${params}` }));

  const response = await axios.get(finalUrl, {
    headers: { Authorization: auth({ method: "GET", url: finalUrl }) },
  });

  const tweets = response.data.statuses;

  const extractValuesAndJoin = (obj: any, key: string) =>
    Object.values(obj)
      .map((value: any) => (key ? value[key] : value))
      .join(", ");

  return tweets.map(
    (tweet: any) =>
      ({
        id: idToHash(tweet.id_str),
        source: "twitterApi",
        title: `Tweet by ${tweet.user.name} (@${tweet.user.screen_name})`,
        description: `User description: ${tweet.user.description}<br/>
        Hashtags: ${extractValuesAndJoin(tweet.entities.hashtags, "text")}<br/>
        Mentions: ${extractValuesAndJoin(
          tweet.entities.user_mentions,
          "name"
        )}<br/>
        Symbols: ${extractValuesAndJoin(tweet.entities.symbols, "text")}<br/>
        URLs: ${extractValuesAndJoin(tweet.entities.urls, "url")}<br/>
        `,
        content: tweet.text,
        imageUrl: tweet?.entities?.media?.[0]?.media_url || null,
        url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        publishedAt: tweet.created_at,
      } as SearchResult)
  );
}

async function searchRedditApi(query: SearchQuery): Promise<SearchResult[]> {
  const { q, advancedQuery } = query;
  const { redditApi } = advancedQuery || {};
  const { q: redditApiQuery, subreddit, t, limit } = redditApi || {};
  const redditApiEndpoint = `https://www.reddit.com/r/${
    subreddit ?? "all"
  }/search.json`;

  const response = await axios.get(redditApiEndpoint, {
    params: { q: redditApiQuery ?? q, t, limit, raw_json: 1 },
  });

  const posts = response.data.data.children;

  return posts.map(
    (post: any) =>
      ({
        id: idToHash(post.data.id),
        source: "redditApi",
        title: post.data.title,
        description: `Subreddit: ${post.data.subreddit_name_prefixed}<br/>
        Author: ${post.data.author}<br/>
        Score: ${post.data.score}<br/>
        Upvotes: ${post.data.ups}<br/>
        Downvotes: ${post.data.downs}<br/>
        Comments: ${post.data.num_comments}<br/>
        `,
        content: post.data.selftext_html || post.data.selftext,
        url: `https://www.reddit.com${post.data.permalink}`,
        imageUrl: post.data.preview?.images?.[0]?.source?.url || null,
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
