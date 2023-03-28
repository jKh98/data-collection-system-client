import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, message, notification } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import ProtectedRoute from "&components/ProtectedRoute";
import Splash from "&components/Splash";
import { auth } from "&config/firebase";
import { Paths } from "&constants/paths";
import EditJob from "&pages/jobs/EditJob";
import Job from "&pages/jobs/Job";
import JobsList from "&pages/jobs/JobsList";
import NewJob from "&pages/jobs/NewJob";
import { Login } from "&pages/login/Login";
import Results from "&pages/Results/Results";

function App() {
  notification.config({ maxCount: 1, duration: 3 });

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const isAuthenticated = !!user;

  if (error) message.error(error.message);

  if (loading) return <Splash />;

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute validator={!isAuthenticated} fallback={Paths.Home} />
        }
      >
        <Route path={Paths.LogIn} element={<Login />} />
      </Route>
      <Route
        element={
          <Layout>
            <Header
              style={{ color: "white", fontWeight: "bold" }}
              onClick={() => navigate(Paths.Home)}
            >
              Data Collection System
            </Header>
            <Content
              style={{
                padding: "24px",
                height: "calc(100vh - 64px)",
                overflow: "auto",
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
        <Route path={Paths.Job} element={<Job />} />
        <Route path={Paths.JobEdit} element={<EditJob />} />
        <Route path={Paths.JobNew} element={<NewJob />} />
        <Route path={Paths.Results} element={<Results />} />
      </Route>
      <Route path={"*"} element={<Navigate to={Paths.Jobs} />} />
    </Routes>
  );
}
export default App;
