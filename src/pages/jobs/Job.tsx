import { Fragment } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { Card, Col, Divider, Result, Row, Tag, Typography } from "antd";
import { doc } from "firebase/firestore";

import JobActions from "./JobActions";

import { PageHeader } from "&components/Page";
import Splash from "&components/Splash";
import { store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { Paths } from "&constants/paths";

const Job = () => {
  const { id } = useParams();
  const [jobDoc, loading, error] = useDocument(doc(store, "jobs", id!));
  const job = jobDoc?.data() as SearchJob;

  if (!id) {
    return <Navigate to={Paths.Jobs} replace />;
  }

  if (loading) {
    return <Splash />;
  }

  if (error) {
    return <Result status="error" title="Error" subTitle={error.message} />;
  }

  if (id && !job) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );
  }

  const { status } = job;

  return (
    <Fragment>
      <PageHeader
        title={
          <Fragment>
            Job: {id}
            <Divider type="vertical" />
            <Tag
              color={StatusColors[status]}
              style={{ verticalAlign: "middle" }}
            >
              {status}
            </Tag>
          </Fragment>
        }
        withBack
        extra={[<JobActions id={id} status={status} />]}
      />

      <Card title="Job Details">
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Text strong>Name</Typography.Text>
            <Typography.Paragraph>{job.name}</Typography.Paragraph>
          </Col>

          <Col span={12}>
            <Typography.Text strong>Description</Typography.Text>
            <Typography.Paragraph>{job.description}</Typography.Paragraph>
          </Col>

          <Col span={12}>
            <Typography.Text strong>Schedule</Typography.Text>
            <Typography.Paragraph>
              {job.schedule.interval} {job.schedule.unit}
            </Typography.Paragraph>
          </Col>
        </Row>
      </Card>
      <br />
      <Card title="Results"></Card>
    </Fragment>
  );
};

export default Job;
