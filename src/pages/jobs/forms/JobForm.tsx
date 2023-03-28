import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

import NewsApiForm from "./NewsApiForm";
import RedditApiForm from "./RedditApiForm";
import TwitterApiForm from "./TwitterApiForm";

import { Paths } from "&constants/paths";
import { DataSource, SearchJob } from "&types/index";

interface JobFormProps {
  onSubmit: (values: SearchJob) => void;
  initialValues: SearchJob;
  submitting?: boolean;
}

const JobForm = ({ onSubmit, initialValues, submitting }: JobFormProps) => {
  const [form] = Form.useForm();
  const { id } = initialValues;
  const navigate = useNavigate();

  const sources: DataSource[] = Form.useWatch(["query", "sources"], form) || [];
  const noSources = !sources?.length;

  const checkSource = (ds: DataSource) => sources.includes(ds);

  const setSources = (dss: DataSource[]) =>
    form.setFieldValue(["query", "sources"], dss);

  const sourceSelector = (ds: DataSource) => () => {
    if (sources.includes(ds)) {
      setSources(sources.filter((source) => source !== ds));
    } else {
      setSources([...sources, ds]);
    }
  };

  const goBack = () => navigate(Paths.Jobs, { replace: true });

  return (
    <Fragment>
      <Title level={2}>{id ? `Edit Job: ${id}` : `New Job`}</Title>
      <Form
        form={form}
        name="job"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        layout="horizontal"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Card title={"Details"} bordered>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <TextArea />
              </Form.Item>
            </Card>
            <br />
            <Card title={"Schedule"}>
              <Form.Item name={["schedule", "interval"]} label="Interval">
                <Input />
              </Form.Item>
            </Card>
            <br />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card title={"Query"} bordered>
              {noSources && (
                <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 } }}>
                  <Alert
                    message="No sources selected"
                    type="warning"
                    showIcon
                  />
                </Form.Item>
              )}

              <Form.Item
                name={["query", "q"]}
                label="Main Query"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["query", "sources"]}
                label="Sources"
                rules={[{ required: true }]}
              >
                <Select mode="multiple">
                  {Object.values(DataSource).map((v) => (
                    <Select.Option key={v}>{v}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Collapse activeKey={sources}>
                <Collapse.Panel
                  header="News API"
                  key={DataSource.NEWS_API}
                  showArrow={false}
                  collapsible="header"
                  extra={
                    <Switch
                      checked={checkSource(DataSource.NEWS_API)}
                      onChange={sourceSelector(DataSource.NEWS_API)}
                    />
                  }
                >
                  {checkSource(DataSource.NEWS_API) && <NewsApiForm />}
                </Collapse.Panel>
                <Collapse.Panel
                  header="Twitter API"
                  key={DataSource.TWITTER_API}
                  showArrow={false}
                  collapsible="header"
                  extra={
                    <Switch
                      checked={checkSource(DataSource.TWITTER_API)}
                      onChange={sourceSelector(DataSource.TWITTER_API)}
                    />
                  }
                >
                  {checkSource(DataSource.TWITTER_API) && <TwitterApiForm />}
                </Collapse.Panel>
                <Collapse.Panel
                  header="Reddit API"
                  key={DataSource.REDDIT_API}
                  showArrow={false}
                  collapsible="header"
                  extra={
                    <Switch
                      checked={checkSource(DataSource.REDDIT_API)}
                      onChange={sourceSelector(DataSource.REDDIT_API)}
                    />
                  }
                >
                  {checkSource(DataSource.REDDIT_API) && <RedditApiForm />}
                </Collapse.Panel>
              </Collapse>
            </Card>
          </Col>
        </Row>

        <br />
        <br />
        <br />

        <Row
          justify="end"
          gutter={[16, 16]}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 16,
            background: "white",
            width: "100%",
            borderTop: "1px solid #e8e8e8",
          }}
        >
          <Col>
            <Button onClick={goBack}>Cancel</Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={noSources}
              loading={submitting}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default JobForm;
