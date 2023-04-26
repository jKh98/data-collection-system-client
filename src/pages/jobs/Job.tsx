import { Fragment } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Alert, Card, Col, Divider, Result, Row, Tag, Typography } from "antd";
import { doc } from "firebase/firestore";

import JobActions from "./JobActions";

import DataRow from "&components/DataRow";
import DataSource from "&components/DataSource";
import DateTime from "&components/DateTime";
import { PageHeader } from "&components/Page";
import Splash from "&components/Splash";
import { store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { StatusIcons } from "&constants/icons";
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

  const {
    status,
    name,
    description,
    createdTime,
    lastUpdatedTime,
    query,
    schedule,
    lastRunTime,
    nextRunTime,
  } = job || {};

  const { interval, unit } = schedule || {};

  return (
    <Fragment>
      <PageHeader
        title={`Job: ${id}`}
        titleExtra={
          <Tag icon={StatusIcons[status]} color={StatusColors[status]}>
            {status}
          </Tag>
        }
        withBack
        extra={[<JobActions key="1" id={id} status={status} />]}
      />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Job Details">
            <DataRow title="Name" value={<Text>{name}</Text>} />
            <DataRow title="Description" value={<Text>{description}</Text>} />
            <Divider />
            <DataRow
              title="Created"
              value={<DateTime timestamp={createdTime} />}
            />
            <DataRow
              title="Updated"
              value={<DateTime timestamp={lastUpdatedTime!} />}
            />
            <Divider />
            <DataRow
              title="Schedule"
              value={
                <Text code>
                  {interval} {unit}
                </Text>
              }
            />
            <DataRow
              title="Last Run"
              value={<DateTime timestamp={lastRunTime!} />}
            />
            <DataRow
              title="Next Run"
              value={<DateTime timestamp={nextRunTime!} />}
            />
            <Divider />
            <DataRow
              title="Sources"
              value={query?.sources?.map((source, i) => (
                <DataSource key={i} source={source} />
              ))}
            />
            <Alert
              icon={<InfoCircleOutlined />}
              type="info"
              message="Check the edit page for more details on advanced queries."
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <ResultsList jobId={id} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Job;
