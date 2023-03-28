import { JobStatus } from "&types/index";

export const StatusColors = {
  [JobStatus.PROCESSING]: "blue",
  [JobStatus.ACTIVE]: "green",
  [JobStatus.PAUSED]: "orange",
  [JobStatus.STOPPED]: "red",
};
