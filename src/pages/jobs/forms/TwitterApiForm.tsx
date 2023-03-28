import React, { Fragment } from "react";
import { Form, Input, InputNumber, Select } from "antd";

const TwitterApiForm = () => {
  return (
    <Fragment>
      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "query"]}
        label="Query"
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "max_results"]}
        label="Max Results"
      >
        <InputNumber size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "tweet.fields"]}
        label="Tweet Fields"
      >
        <Select size="small" mode="tags" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "expansions"]}
        label="Expansions"
      >
        <Select size="small" mode="tags" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "twitterApi", "user.fields"]}
        label="User Fields"
      >
        <Select size="small" mode="tags" />
      </Form.Item>
    </Fragment>
  );
};

export default TwitterApiForm;
