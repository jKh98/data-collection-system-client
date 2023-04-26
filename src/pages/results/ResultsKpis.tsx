import { Col, Row, StatisticProps } from "antd";

import DataSource from "&components/DataSource";
import Kpi from "&components/Kpi";

interface ResultsKpisProps {
  results: Array<SearchResult>;
  loading: boolean;
}

const ResultsKpis = ({ results, loading }: ResultsKpisProps) => {
  const total = results?.length || 0;

  const getTotalResultsBySource = (source: string) =>
    results?.filter((result) => result.source === source).length || 0;

  const google = getTotalResultsBySource("newsApi");
  const twitter = getTotalResultsBySource("twitterApi");
  const reddit = getTotalResultsBySource("redditApi");

  const kpis: Array<StatisticProps> = [
    {
      title: "Total Results",
      value: total,
    },
    {
      title: "From Google",
      value: google,
      suffix: total ? `/${total}` : "",
      prefix: <DataSource source="newsApi" />,
    },
    {
      title: "From Twitter",
      value: twitter,
      suffix: total ? `/${total}` : "",
      prefix: <DataSource source="twitterApi" />,
    },
    {
      title: "From Reddit",
      value: reddit,
      suffix: total ? `/${total}` : "",
      prefix: <DataSource source="redditApi" />,
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      {kpis.map((kpi, i) => (
        <Col xs={24} sm={12} md={6} lg={6} key={i}>
          <Kpi kpi={kpi} loading={loading} />
        </Col>
      ))}
    </Row>
  );
};

export default ResultsKpis;
