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
        <Select size="small" mode="multiple">
          <Select.Option value="attachments">Attachments</Select.Option>
          <Select.Option value="author_id">Author ID</Select.Option>
          <Select.Option value="context_annotations">
            Context Annotations
          </Select.Option>
          <Select.Option value="conversation_id">Conversation ID</Select.Option>
          <Select.Option value="created_at">Created At</Select.Option>
          <Select.Option value="entities">Entities</Select.Option>
          <Select.Option value="geo">Geo</Select.Option>
          <Select.Option value="id">ID</Select.Option>
          <Select.Option value="in_reply_to_user_id">
            In Reply To User ID
          </Select.Option>
          <Select.Option value="lang">Language</Select.Option>
          <Select.Option value="non_public_metrics">
            Non Public Metrics
          </Select.Option>
          <Select.Option value="organic_metrics">Organic Metrics</Select.Option>
          <Select.Option value="possibly_sensitive">
            Possibly Sensitive
          </Select.Option>
          <Select.Option value="promoted_metrics">
            Promoted Metrics
          </Select.Option>
          <Select.Option value="public_metrics">Public Metrics</Select.Option>
          <Select.Option value="referenced_tweets">
            Referenced Tweets
          </Select.Option>
          <Select.Option value="reply_settings">Reply Settings</Select.Option>
          <Select.Option value="source">Source</Select.Option>
          <Select.Option value="text">Text</Select.Option>
          <Select.Option value="withheld">Withheld</Select.Option>
        </Select>
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
        <Select size="small" mode="multiple">
          <Select.Option value="created_at">Created At</Select.Option>
          <Select.Option value="description">Description</Select.Option>
          <Select.Option value="entities">Entities</Select.Option>
          <Select.Option value="id">ID</Select.Option>
          <Select.Option value="location">Location</Select.Option>
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="pinned_tweet_id">Pinned Tweet ID</Select.Option>
          <Select.Option value="profile_image_url">
            Profile Image URL
          </Select.Option>
          <Select.Option value="protected">Protected</Select.Option>
          <Select.Option value="public_metrics">Public Metrics</Select.Option>
          <Select.Option value="url">URL</Select.Option>
          <Select.Option value="username">Username</Select.Option>
          <Select.Option value="verified">Verified</Select.Option>
          <Select.Option value="withheld">Withheld</Select.Option>
        </Select>
      </Form.Item>
    </Fragment>
  );
};

export default TwitterApiForm;
