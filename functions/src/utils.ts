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

export const checkResultChanged = (
  result: SearchResult,
  doc: FirebaseFirestore.DocumentSnapshot
) => {
  if (!doc.exists) {
    return true;
  }

  const { content, title, url, desctiption } = result;
  const {
    content: docContent,
    title: docTitle,
    url: docUrl,
    desctiption: docDesctiption,
  } = doc.data() || {};

  return (
    content !== docContent ||
    title !== docTitle ||
    url !== docUrl ||
    desctiption !== docDesctiption
  );
};
