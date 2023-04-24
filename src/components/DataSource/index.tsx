import React from "react";
import {
  GoogleSquareFilled,
  RedditSquareFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import { Typography } from "antd";

interface DataSourceProps {
  source: dataSource;
  size?: number;
}

const DataSource = ({ source, size = 22 }: DataSourceProps) => {
  const sourceToIcon: { [key in dataSource]: React.ReactNode } = {
    twitterApi: (
      <TwitterSquareFilled style={{ fontSize: size, color: "#1890ff" }} />
    ),
    redditApi: (
      <RedditSquareFilled style={{ fontSize: size, color: "#ff4d4f" }} />
    ),
    newsApi: (
      <GoogleSquareFilled style={{ fontSize: size, color: "#52c41a" }} />
    ),
  };

  return <Typography.Link>{sourceToIcon[source]}</Typography.Link>;
};

export default DataSource;
