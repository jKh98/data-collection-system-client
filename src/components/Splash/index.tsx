import { LoadingOutlined } from "@ant-design/icons";
import { Row, Space, Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

function Splash() {
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Space align="center" direction="vertical">
        <Spin indicator={antIcon} />
      </Space>
    </Row>
  );
}

export default Splash;
