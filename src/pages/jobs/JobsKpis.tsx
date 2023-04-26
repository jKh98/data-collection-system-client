import { Col, Row, StatisticProps } from "antd";

import Kpi from "&components/Kpi";

interface JobsKpisProps {
  jobs: Array<SearchJob>;
  loading: boolean;
}

const JobsKpis = ({ jobs, loading }: JobsKpisProps) => {
  const getJobCountBtStatus = (status: string) =>
    jobs?.filter((job) => job.status === status).length || 0;

  const total = jobs?.length || 0;
  const active = getJobCountBtStatus("active");
  const stopped = getJobCountBtStatus("stopped");
  const running = getJobCountBtStatus("running");

  const kpis: Array<StatisticProps> = [
    {
      title: "Total",
      value: total,
    },
    {
      title: "Active",
      value: active,
      suffix: total ? `/${total}` : "",
    },
    {
      title: "Stopped",
      value: stopped,
      suffix: total ? `/${total}` : "",
    },
    {
      title: "Running",
      value: running,
      suffix: total ? `/${total}` : "",
    },
  ];
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      {kpis.map((kpi, i) => (
        <Col xs={24} sm={12} md={6} lg={4} key={i}>
          <Kpi kpi={kpi} loading={loading} />
        </Col>
      ))}
    </Row>
  );
};

export default JobsKpis;
