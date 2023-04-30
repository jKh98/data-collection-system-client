import { Timestamp } from "firebase/firestore";

declare global {
  /** The user document stored in Firestore */
  interface SearchJob {
    id?: string; // the id of the job in Firestore
    userId: string; // the Firebase Auth user id of the user who added the job
    name: string; // the name of the job
    description: string; // the description of the job
    query: SearchQuery; // the search query with the sources to retrieve results from
    schedule: Schedule; // the schedule for the job
    status: jobStatus; // the status of the job
    createdTime: Timestamp; // the time the job was created
    lastUpdatedTime?: Timestamp; // the time the job was last updated
    lastRunTime?: Timestamp; // the time the job was last run
    nextRunTime: Timestamp; // the time the job will next run
  }

  interface SearchQuery {
    q: string; // the search query term or phrase
    sources: dataSource[]; // an array of data sources to retrieve results from
    // optional advanced query parameters for each data source
    advancedQuery?: {
      newsApi?: NewsApiQuery; // the advanced query parameters for the News API
      twitterApi?: TwitterApiQuery; // the advanced query parameters for the Twitter API
      redditApi?: RedditApiQuery; // the advanced query parameters for the Reddit API
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
    q: string; // the search query term or phrase, overrides the q parameter in the main query
    count?: number; // the maximum number of results to retrieve per page, up to 100
    result_type?: "mixed" | "recent" | "popular"; // the type of results to retrieve
    until?: string; // a date in the format 'yyyy-mm-dd' to retrieve tweets until
  }

  interface RedditApiQuery {
    q: string; // the search query term or phrase, overrides the q parameter in the main query
    subreddit?: string; // the subreddit to restrict the search to
    t?: string; // the time period to retrieve results from, e.g. 'week'
    limit?: number; // the maximum number of results to retrieve per page, up to 100
  }

  interface Schedule {
    interval: number; // The interval in seconds between each scheduled run
    unit: "minutes" | "hours" | "days"; // The unit of the interval
    startTime?: Timestamp; // Optional start time for the schedule
    endTime?: Timestamp; // Optional end time for the schedule
  }

  type dataSource = "newsApi" | "twitterApi" | "redditApi";

  type jobStatus =
    | "running"
    | "active"
    | "stopped"
    | "failed"
    | "finished"
    | "scheduled";

  interface SearchResult {
    id: string; // the id of the result in Firestore
    jobId?: string; // the id of the job that the result belongs to
    source: dataSource; // the data source that the result came from
    title: string; // the title of the result
    description?: string; // the description of the result
    content: string; // the content of the result
    url: string; // the url of the result
    imageUrl?: string; // the url of the image associated with the result
    pdfUrl?: string; // the url of the pdf associated with the result
    publishedAt?: string; // the date the result was published
    createdTime: Timestamp; // the time the result was created
    updatedTime: Timestamp; // the time the result was last updated
  }
}

export {};
