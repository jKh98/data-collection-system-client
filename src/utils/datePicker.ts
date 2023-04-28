import { Timestamp } from "firebase/firestore";
import moment, { Moment } from "moment";

export const fbTimestampUtils = {
  getValueFromEvent: (e: Moment) =>
    e ? Timestamp.fromDate(e.toDate()) : undefined,
  getValueProps: (e: Timestamp) => ({
    value: e ? moment(e.toDate()) : undefined,
  }),
};

export const simpleDateUtils = {
  getValueFromEvent: (e: Moment) => (e ? e.format("YYYY-MM-DD") : undefined),
  getValueProps: (e: string) => ({ value: e ? moment(e) : undefined }),
};
