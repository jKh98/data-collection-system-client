import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import NewsApiForm from "./NewsApiForm";
import RedditApiForm from "./RedditApiForm";
import TwitterApiForm from "./TwitterApiForm";

import { PageHeader } from "&components/Page";
import { Paths } from "&constants/paths";

interface JobFormProps {
  onSubmit: (values: SearchJob) => void;
  initialValues: Partial<SearchJob>;
  submitting?: boolean;
}

const JobForm = ({ onSubmit, initialValues, submitting }: JobFormProps) => {
  const [form] = Form.useForm();
  const { id } = initialValues;
  const navigate = useNavigate();

  const sources: dataSource[] = Form.useWatch(["query", "sources"], form) || [];
  const noSources = !sources?.length;

  const checkSource = (ds: dataSource) => sources.includes(ds);

  const setSources = (dss: dataSource[]) =>
    form.setFieldValue(["query", "sources"], dss);

  const sourceSelector = (ds: dataSource) => () => {
    if (sources.includes(ds)) {
      setSources(sources.filter((source) => source !== ds));
    } else {
      setSources([...sources, ds]);
    }
  };

  const goBack = () => navigate(Paths.Jobs, { replace: true });

  return (
    <Fragment>
      <PageHeader title={id ? `Edit Job: ${id}` : `New Job`} withBack />
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
              <Form.Item label="Interval" required>
                <Input.Group compact>
                  <Form.Item
                    noStyle
                    name={["schedule", "interval"]}
                    rules={[
                      { required: true, message: "Interval is required" },
                      { type: "number", min: 0 },
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item noStyle name={["schedule", "unit"]}>
                    <Select style={{ minWidth: 120 }}>
                      <Select.Option key={"minutes"}>minutes</Select.Option>
                      <Select.Option key={"hours"}>hours</Select.Option>
                      <Select.Option key={"days"}>days</Select.Option>
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item name={["schedule", "startTime"]} label="Start Time">
                <DatePicker showTime />
              </Form.Item>
              <Form.Item name={["schedule", "endTime"]} label="End Time">
                <DatePicker showTime />
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
                  <Select.Option key={"newsApi"}>News API</Select.Option>
                  <Select.Option key={"twitterApi"}>Twitter</Select.Option>
                  <Select.Option key={"redditApi"}>Reddit</Select.Option>
                </Select>
              </Form.Item>

              <Collapse activeKey={sources}>
                <Collapse.Panel
                  header="News API"
                  key={"newsApi"}
                  showArrow={false}
                  collapsible="header"
                  extra={
                    <Switch
                      key={1}
                      checked={checkSource("newsApi")}
                      onChange={sourceSelector("newsApi")}
                    />
                  }
                >
                  {checkSource("newsApi") && <NewsApiForm />}
                </Collapse.Panel>
                <Collapse.Panel
                  header="Twitter API"
                  key={"twitterApi"}
                  showArrow={false}
                  collapsible="header"
                  extra={
                    <Switch
                      key={1}
                      checked={checkSource("twitterApi")}
                      onChange={sourceSelector("twitterApi")}
                    />
                  }
                >
                  {checkSource("twitterApi") && <TwitterApiForm />}
                </Collapse.Panel>
                <Collapse.Panel
                  header="Reddit API"
                  key={"redditApi"}
                  showArrow={false}
                  collapsible="header"
                  extra={
                    <Switch
                      key={1}
                      checked={checkSource("redditApi")}
                      onChange={sourceSelector("redditApi")}
                    />
                  }
                >
                  {checkSource("redditApi") && <RedditApiForm />}
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
