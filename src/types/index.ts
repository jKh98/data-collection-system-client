/**
 * A search job is triggered by a user to the backend system to start a scheduled search task
 * to retrieve uniform indexed result records from multiple data streams
 */
export interface SearchJob {
  id?: string;
  userId: string;
  name: string;
  description: string;
  query: SearchQuery;
  schedule: Schedule;
  status: JobStatus;
  createdTime?: Date;
  lastUpdatedTime?: Date;
  lastRunTime?: Date;
  nextRunTime?: Date;
}

export enum DataSource {
  NEWS_API = "newsApi",
  TWITTER_API = "twitterApi",
  REDDIT_API = "redditApi",
}

export interface SearchQuery {
  q: string; // the search query term or phrase
  sources: DataSource[]; // an array of data sources to retrieve results from
  advancedQuery?: {
    newsApi?: NewsApiQuery;
    twitterApi?: TwitterApiQuery;
    redditApi?: RedditApiQuery;
  };
}

export interface NewsApiQuery {
  q: string; // the search query term or phrase. overrides the q parameter in the main query
  sources?: string[]; // an array of sources to retrieve news from
  domains?: string[]; // an array of domains to restrict the search to
  excludeDomains?: string[]; // an array of domains to exclude from the search
  from?: string; // a date in the format 'yyyy-mm-dd' to retrieve news from
  to?: string; // a date in the format 'yyyy-mm-dd' to retrieve news to
  language?: string; // the language to retrieve news in, e.g. 'en' for English
}

export interface TwitterApiQuery {
  query: string; // the search query term or phrase, overrides the q parameter in the main query
  max_results?: number; // the maximum number of results to retrieve per page, up to 100
  "tweet.fields"?: string[]; // an array of fields to include in the tweet objects, e.g. 'created_at'
  expansions?: string[]; // an array of fields to expand in the tweet objects, e.g. 'author_id'
  "user.fields"?: string[]; // an array of fields to include in the user objects, e.g. 'name'
}

export interface RedditApiQuery {
  q: string; // the search query term or phrase, overrides the q parameter in the main query
  subreddit?: string; // the subreddit to restrict the search to
  t?: string; // the time period to retrieve results from, e.g. 'week'
  limit?: number; // the maximum number of results to retrieve per page, up to 100
}

export interface Schedule {
  interval: string; // ISO duration string e.g. "PT5M" (5 minutes)
  startTime?: Date; // Optional start time for the schedule
  endTime?: Date; // Optional end time for the schedule
}

export enum JobStatus {
  PROCESSING = "PROCESSING",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}
