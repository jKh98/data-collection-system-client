import { Timestamp } from "firebase/firestore";

declare global {
  /**
   * A search job is triggered by a user to the backend system to start a scheduled search task
   * to retrieve uniform indexed result records from multiple data streams
   */
  interface SearchJob {
    id?: string;
    userId: string;
    name: string;
    description: string;
    query: SearchQuery;
    schedule: Schedule;
    status: jobStatus;
    createdTime: Timestamp;
    lastUpdatedTime?: Timestamp;
    lastRunTime?: Timestamp;
    nextRunTime: Timestamp;
  }

  interface SearchQuery {
    q: string; // the search query term or phrase
    sources: dataSource[]; // an array of data sources to retrieve results from
    advancedQuery?: {
      newsApi?: NewsApiQuery;
      twitterApi?: TwitterApiQuery;
      redditApi?: RedditApiQuery;
    };
  }

  interface NewsApiQuery {
    q: string; // the search query term or phrase. overrides the q parameter in the main query
    sources?: string[]; // an array of sources to retrieve news from
    domains?: string[]; // an array of domains to restrict the search to
    excludeDomains?: string[]; // an array of domains to exclude from the search
    from?: string; // a date in the format 'yyyy-mm-dd' to retrieve news from
    to?: string; // a date in the format 'yyyy-mm-dd' to retrieve news to
    language?: string; // the language to retrieve news in, e.g. 'en' for English
  }

  interface TwitterApiQuery {
    query: string; // the search query term or phrase, overrides the q parameter in the main query
    max_results?: number; // the maximum number of results to retrieve per page, up to 100
    "tweet.fields"?: string[]; // an array of fields to include in the tweet objects, e.g. 'created_at'
    expansions?: string[]; // an array of fields to expand in the tweet objects, e.g. 'author_id'
    "user.fields"?: string[]; // an array of fields to include in the user objects, e.g. 'name'
  }

  interface RedditApiQuery {
    q: string; // the search query term or phrase, overrides the q parameter in the main query
    subreddit?: string; // the subreddit to restrict the search to
    t?: string; // the time period to retrieve results from, e.g. 'week'
    limit?: number; // the maximum number of results to retrieve per page, up to 100
  }

  interface Schedule {
    interval: number; // The interval in seconds between each scheduled run
    unit: intervalUnit; // The unit of the interval
    startTime?: string; // Optional start time for the schedule
    endTime?: string; // Optional end time for the schedule
  }

  type dataSource = "newsApi" | "twitterApi" | "redditApi";

  type jobStatus = "running" | "active" | "stopped" | "failed";

  type intervalUnit = "minutes" | "hours" | "days";

  interface SearchResult {
    id: string;
    jobId?: string;
    source: dataSource;
    title: string;
    description?: string;
    content: string;
    url: string;
    imageUrl?: string;
    pdfUrl?: string;
    publishedAt?: string;
    createdTime: Timestamp;
    updatedTime: Timestamp;
  }
}

export {};
