export const scheduleToSeconds = (schedule: Schedule) => {
  const { interval, unit } = schedule;

  switch (unit) {
    case "minutes":
      return interval * 60;
    case "hours":
      return interval * 60 * 60;
    case "days":
      return interval * 60 * 60 * 24;
    default:
      return 0;
  }
};
