import React, { Fragment } from "react";
import { Form, Input, InputNumber, Select } from "antd";

import { LUCENE_QUERY_SYNTAX_QUERY_TOOLTIP } from "&constants/tooltips";

const RedditApiForm = () => {
  return (
    <Fragment>
      <Form.Item
        name={["query", "advancedQuery", "redditApi", "q"]}
        tooltip={LUCENE_QUERY_SYNTAX_QUERY_TOOLTIP}
        label="Query"
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "redditApi", "subreddit"]}
        label="Subreddit"
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "redditApi", "t"]}
        label="Time Period"
      >
        <Select size="small">
          <Select.Option value="hour">Hour</Select.Option>
          <Select.Option value="day">Day</Select.Option>
          <Select.Option value="week">Week</Select.Option>
          <Select.Option value="month">Month</Select.Option>
          <Select.Option value="year">Year</Select.Option>
          <Select.Option value="all">All</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "redditApi", "limit"]}
        label="Limit"
      >
        <InputNumber size="small" min={1} max={100} />
      </Form.Item>
    </Fragment>
  );
};

export default RedditApiForm;
