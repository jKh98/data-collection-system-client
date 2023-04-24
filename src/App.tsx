import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout, message, notification } from "antd";

import { Content, Header } from "&components/Layout";
import ProtectedRoute from "&components/ProtectedRoute";
import Splash from "&components/Splash";
import { auth } from "&config/firebase";
import { Paths } from "&constants/paths";
import EditJob from "&pages/jobs/EditJob";
import Job from "&pages/jobs/Job";
import JobsList from "&pages/jobs/JobsList";
import NewJob from "&pages/jobs/NewJob";
import { Login } from "&pages/login/Login";
import Results from "&pages/results/ResultsList";

function App() {
  notification.config({ maxCount: 1, duration: 3 });

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
            <Header />
            <Content>
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
      </Route>
      <Route path={"*"} element={<Navigate to={Paths.Jobs} />} />
    </Routes>
  );
}
export default App;
