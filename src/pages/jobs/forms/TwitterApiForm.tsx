import React, { Fragment } from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";

import { TWITTER_QUERY_SYNTAX_QUERY_TOOLTIP } from "&config/tooltips";

const TwitterApiForm = () => {
  //   q
  // count
  // result_type
  // until

  return (
    <Fragment>
      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "q"]}
        tooltip={TWITTER_QUERY_SYNTAX_QUERY_TOOLTIP}
        label="Query"
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "count"]}
        label="Max Results"
      >
        <InputNumber size="small" min={1} max={100} />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "result_type"]}
        label="Tweet Fields"
      >
        <Select size="small">
          <Select.Option value="recent">Recent</Select.Option>
          <Select.Option value="popular">Popular</Select.Option>
          <Select.Option value="mixed">Mixed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "until"]}
        label="Until"
      >
        <DatePicker size="small" />
      </Form.Item>
    </Fragment>
  );
};

export default TwitterApiForm;
