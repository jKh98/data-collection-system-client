import { Card, Skeleton, Space, Statistic, StatisticProps } from "antd";

export interface KpiProps {
  loading: boolean;
  kpi: StatisticProps;
}

const Kpi = ({ loading, kpi }: KpiProps) => {
  return (
    <Card size="small" bordered>
      {loading ? (
        <Space direction="vertical">
          <Skeleton.Button active size="small" shape="square" />
          <Skeleton.Button active size="default" block />
        </Space>
      ) : (
        <Statistic {...kpi} />
      )}
    </Card>
  );
};

export default Kpi;
