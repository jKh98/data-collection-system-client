import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Paths } from "&constants/paths";

// import { handleFirebaseError } from "../../util/handlers";

const { Content } = Layout;
const { Title } = Typography;

export function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async ({ email, password }: typeof initialValues) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // handleFirebaseError(e);
    }
  };

  const alertTemporaryUnavailable = () =>
    alert("This feature is temporary unavailable");

  return (
    <Content>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col md={8} xs={24}>
          <Title>Login</Title>
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
              <Link to="">Forgot your password?</Link>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              Don't have an account?{" "}
              <Link onClick={alertTemporaryUnavailable} to={Paths.Register}>
                Register here
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
