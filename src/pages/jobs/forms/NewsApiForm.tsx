import React, { Fragment } from "react";
import { DatePicker, Form, Input, Select } from "antd";

const NewsApiForm = () => {
  return (
    <Fragment>
      <Form.Item
        name={["query", "advancedQuery", "newsApi", "q"]}
        label="Query"
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "sources"]}
        label="Sources"
      >
        <Select size="small" mode="tags" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "domains"]}
        label="Domains"
      >
        <Select size="small" mode="tags" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "excludeDomains"]}
        label="Exclude Domains"
      >
        <Select size="small" mode="tags" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "from"]}
        label="From"
      >
        <DatePicker size="small" />
      </Form.Item>

      <Form.Item name={["query", "advancedQuery", "newsApi", "to"]} label="To">
        <DatePicker size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "language"]}
        label="Language"
      >
        <Select size="small">
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="de">German</Select.Option>
          <Select.Option value="fr">French</Select.Option>
          <Select.Option value="es">Spanish</Select.Option>
          <Select.Option value="it">Italian</Select.Option>
          <Select.Option value="nl">Dutch</Select.Option>
          <Select.Option value="pt">Portuguese</Select.Option>
          <Select.Option value="ru">Russian</Select.Option>
          <Select.Option value="ar">Arabic</Select.Option>
          <Select.Option value="zh">Chinese</Select.Option>
          <Select.Option value="ja">Japanese</Select.Option>
          <Select.Option value="ko">Korean</Select.Option>
        </Select>
      </Form.Item>
    </Fragment>
  );
};

export default NewsApiForm;
