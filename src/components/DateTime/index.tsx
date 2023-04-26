import React from "react";
import { Space, Typography } from "antd";
import { Timestamp } from "firebase/firestore";

interface DateTimeProps {
  timestamp: Timestamp;
}

const DateTime = ({ timestamp }: DateTimeProps) => {
  const dateTimeString = timestamp?.toDate()?.toLocaleString();

  if (!dateTimeString) {
    return <Space>-</Space>;
  }

  const [date, time] = dateTimeString.split(",");

  return (
    <Space size="small">
      <Typography.Text style={{ whiteSpace: "nowrap" }} code>
        {date}
      </Typography.Text>
      <Typography.Text style={{ whiteSpace: "nowrap" }} code>
        {time}
      </Typography.Text>
    </Space>
  );
};

export default DateTime;
