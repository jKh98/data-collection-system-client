/**
 * A search job is triggered by a user to the backend system to start a scheduled search task
 * to retrieve uniform indexed result records from multiple data streams
 */
export interface SearchJob {
  id?: string;
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

export interface SearchQuery {
  include?: string[];
  exclude?: string[];
  query?: string;
  from?: Date;
  to?: Date;
}

export interface Schedule {
  interval: number;
  unit:
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years"
    | "cron";
}

export enum JobStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ERROR = "error",
}
