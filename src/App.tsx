import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout, message, notification } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

import ProtectedRoute from "&components/ProtectedRoute";
import Splash from "&components/Splash";
import { auth } from "&config/firebase";
import { Paths } from "&constants/paths";
import JobForm from "&pages/jobs/JobForm";
import JobsList from "&pages/jobs/JobsList";
import { Login } from "&pages/login/Login";
import Results from "&pages/Results/Results";

function App() {
  notification.config({ maxCount: 1, duration: 3 });

  const [user, loading, error] = useAuthState(auth);
  const isAuthenticated = !!user;

  if (error) message.error(error.message);

  if (loading) return <Splash />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              validator={!isAuthenticated}
              fallback={Paths.Home}
            />
          }
        >
          <Route path={Paths.LogIn} element={<Login />} />
        </Route>
        <Route
          element={
            <Layout>
              <Header>
                <Title level={4} style={{ color: "white" }}>
                  Job Search
                </Title>
              </Header>
              <Content
                style={{
                  padding: "24px",
                  height: "calc(100vh - 64px)",
                }}
              >
                <ProtectedRoute
                  validator={isAuthenticated}
                  fallback={Paths.LogIn}
                />
              </Content>
            </Layout>
          }
        >
          <Route path={Paths.Jobs} element={<JobsList />} />
          <Route path={Paths.Job} element={<JobForm />} />
          <Route path={Paths.Results} element={<Results />} />
        </Route>
        <Route path={"*"} element={<Navigate to={Paths.Jobs} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
