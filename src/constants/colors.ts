import { JobStatus } from "&types/index";

export const StatusColors = {
  [JobStatus.ACTIVE]: "#00BFA6",
  [JobStatus.INACTIVE]: "#FFD600",
  [JobStatus.ERROR]: "#D50000",
};
