import { Col, Row, Typography } from "antd";

const { Text } = Typography;

interface DataRowProps {
  title: string;
  value: any;
}

const DataRow = ({ title, value }: DataRowProps) => (
  <Row style={{ marginBottom: 12 }}>
    <Col span={8}>
      <Text type="secondary">{title}</Text>
    </Col>
    <Col span={16}>{value}</Col>
  </Row>
);

export default DataRow;
