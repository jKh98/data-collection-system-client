import React, { Fragment, useEffect } from "react";
import { Form, Input, Select } from "antd";
import moment from "moment";

import DatePicker from "&components/DatePicker";
import { LUCENE_QUERY_SYNTAX_QUERY_TOOLTIP } from "&config/tooltips";
import { simpleDateUtils } from "&utils/datePicker";

type source = { id: string; name: string };

const NewsApiForm = () => {
  const [sources, setSources] = React.useState<Array<source>>([]);
  const [isLoadingSources, setIsLoadingSources] = React.useState(false);

  const {
    REACT_APP_NEWS_API_SOURCES_URL: url,
    REACT_APP_NEWS_API_KEY: apiKey,
  } = process.env;

  useEffect(() => {
    const fetchSources = async () => {
      setIsLoadingSources(true);
      const response = await fetch(`${url}?apiKey=${apiKey}`);
      const data = await response.json();
      setSources(data.sources);
      setIsLoadingSources(false);
    };

    fetchSources();

    return () => {
      setSources([]);
    };
  }, [url, apiKey]);

  return (
    <Fragment>
      <Form.Item
        name={["query", "advancedQuery", "newsApi", "q"]}
        tooltip={LUCENE_QUERY_SYNTAX_QUERY_TOOLTIP}
        label="Query"
      >
        <Input size="small" />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "sources"]}
        label="Sources"
      >
        <Select size="small" mode="multiple" loading={isLoadingSources}>
          {sources?.map((source) => (
            <Select.Option key={source.id} value={source.id}>
              {source.name}
            </Select.Option>
          ))}
        </Select>
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
        dependencies={["query", "advancedQuery", "newsApi", "to"]}
        getValueFromEvent={simpleDateUtils.getValueFromEvent}
        getValueProps={simpleDateUtils.getValueProps}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              const toValue = getFieldValue([
                "query",
                "advancedQuery",
                "newsApi",
                "to",
              ]);

              if (!toValue) return Promise.resolve(value);
              if (!value || value <= toValue) return Promise.resolve(value);

              return Promise.reject(
                new Error("From date should be before to date")
              );
            },
          }),
        ]}
      >
        <DatePicker
          size="small"
          disabledDate={(current) =>
            current && current < moment().subtract(1, "months")
          }
        />
      </Form.Item>

      <Form.Item
        name={["query", "advancedQuery", "newsApi", "to"]}
        label="To"
        dependencies={["query", "advancedQuery", "newsApi", "from"]}
        getValueFromEvent={simpleDateUtils.getValueFromEvent}
        getValueProps={simpleDateUtils.getValueProps}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              const fromValue = getFieldValue([
                "query",
                "advancedQuery",
                "newsApi",
                "from",
              ]);

              if (!fromValue) return Promise.resolve(value);
              if (!value || fromValue <= value) return Promise.resolve(value);

              return Promise.reject(
                new Error("To date should be after from date")
              );
            },
          }),
        ]}
      >
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
