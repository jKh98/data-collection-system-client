export const StatusColors: {
  [K in jobStatus]: string;
} = {
  running: "processing",
  active: "success",
  stopped: "warning",
  failed: "error",
};
