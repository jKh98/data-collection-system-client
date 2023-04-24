import { createHash } from "crypto";

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

  const { content, title, url, description } = result;
  const {
    content: docContent,
    title: docTitle,
    url: docUrl,
    description: docdescription,
  } = doc.data() || {};

  return (
    content !== docContent ||
    title !== docTitle ||
    url !== docUrl ||
    description !== docdescription
  );
};

export const idToHash = (id: string) =>
  createHash("md5").update(id).digest("hex");
