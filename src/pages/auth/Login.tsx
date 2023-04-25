import { useState } from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Paths } from "&constants/paths";

const { Content } = Layout;
const { Title } = Typography;

export function Login() {
  const initialValues = { email: "", password: "" };
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }: typeof initialValues) => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      message.error("Invalid email or password");
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
          <Title level={3}>Login</Title>
          <Form name="login" onFinish={onSubmit} initialValues={initialValues}>
            <Form.Item
              name="email"
              normalize={(value) => value.trim()}
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }, { min: 8 }]}>
              <Input
                type="password"
                placeholder="password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Link to={Paths.ResetPassword}>Forgot your password?</Link>
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
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
