import { useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { RobotOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { Paths } from "&constants/paths";

const { Content } = Layout;
const { Title } = Typography;

export function ResetPassword() {
  const initialValues = { email: "" };
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async ({ email }: typeof initialValues) => {
    try {
      setLoading(true);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      message.success("Password reset email sent");
    } catch (e) {
      message.error(
        "Failed to send password reset email, check your email or try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col md={8} xs={24}>
          <Title style={{ textAlign: "center" }}>
            <RobotOutlined style={{ marginRight: 10 }} />
            DataFetchr
          </Title>
          <Title level={3}>Reset Password</Title>
          <Form name="login" onFinish={onSubmit} initialValues={initialValues}>
            <Form.Item
              name="email"
              normalize={(value) => value.trim()}
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to={Paths.LogIn}>Back to login</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
