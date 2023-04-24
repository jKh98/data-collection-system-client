import { Fragment } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { Alert, Card, Col, Divider, Result, Row, Tag, Typography } from "antd";
import { doc } from "firebase/firestore";

import JobActions from "./JobActions";

import DataSource from "&components/DataSource";
import DateTime from "&components/DateTime";
import { PageHeader } from "&components/Page";
import Splash from "&components/Splash";
import { store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { Paths } from "&constants/paths";
import ResultsList from "&pages/results/ResultsList";

const { Text } = Typography;

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

  const DataRow = ({ title, value }: { title: string; value: any }) => (
    <Row style={{ marginBottom: 12 }}>
      <Col span={8}>
        <Text strong>{title}</Text>
      </Col>
      <Col span={16}>{value}</Col>
    </Row>
  );

  return (
    <Fragment>
      <PageHeader
        title={
          <Fragment>
            Job: {id}
            <Divider type="vertical" />
            <Tag
              color={StatusColors[status]}
              style={{
                verticalAlign: "middle",
                transform: "scale(1.2)",
              }}
            >
              {status}
            </Tag>
          </Fragment>
        }
        withBack
        extra={[<JobActions id={id} status={status} />]}
      />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Job Details">
            <DataRow
              title="Name"
              value={<Text type="secondary">{job.name}</Text>}
            />
            <DataRow
              title="Description"
              value={<Text type="secondary">{job.description}</Text>}
            />
            <Divider />
            <DataRow
              title="Created"
              value={<DateTime timestamp={job.createdTime} />}
            />
            <DataRow
              title="Updated"
              value={<DateTime timestamp={job.lastUpdatedTime!} />}
            />
            <Divider />
            <DataRow
              title="Schedule"
              value={
                <Text code>
                  {job.schedule.interval} {job.schedule.unit}
                </Text>
              }
            />
            <DataRow
              title="Last Run"
              value={<DateTime timestamp={job.lastRunTime!} />}
            />
            <DataRow
              title="Next Run"
              value={<DateTime timestamp={job.nextRunTime!} />}
            />
            <Divider />
            <DataRow
              title="Sources"
              value={job.query?.sources?.map((source, i) => (
                <DataSource key={i} source={source} />
              ))}
            />
            <Alert message="Check the edit page for more details on advanced queries." />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Card title="Results">
            <ResultsList jobId={id} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Job;
