export const StatusColors: {
  [K in jobStatus]: string;
} = {
  running: "blue",
  active: "green",
  stopped: "orange",
  failed: "red",
};
