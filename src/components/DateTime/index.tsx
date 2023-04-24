import React from "react";
import { Space, Typography } from "antd";
import { Timestamp } from "firebase/firestore";

interface DateTimeProps {
  timestamp: Timestamp;
  direction?: "vertical" | "horizontal";
}

const DateTime = ({ timestamp, direction = "horizontal" }: DateTimeProps) => {
  const dateTimeString = timestamp?.toDate()?.toLocaleString();

  if (!dateTimeString) {
    return <Space>-</Space>;
  }

  const [date, time] = dateTimeString.split(",");

  return (
    <Space direction={direction}>
      <Typography.Text code>{date}</Typography.Text>
      <Typography.Text code>{time}</Typography.Text>
    </Space>
  );
};

export default DateTime;
