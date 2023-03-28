import { Fragment } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { Result } from "antd";
import Title from "antd/es/typography/Title";
import { doc } from "firebase/firestore";

import Splash from "&components/Splash";
import { store } from "&config/firebase";
import { Paths } from "&constants/paths";
import { SearchJob } from "&types/index";

const Job = () => {
  const { id } = useParams();
  const [jobDoc, loading, error] = useDocument(doc(store, "jobs", id!));
  const job = jobDoc?.data() as SearchJob;

  if (!id) {
    return <Navigate to={Paths.Jobs} replace />;
  }

  if (loading) {
    return <Splash />;
  }

  if (error) {
    return <Result status="error" title="Error" subTitle={error.message} />;
  }

  if (id && !job) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );
  }

  return (
    <Fragment>
      <Title level={2}>{`Job: ${id}`}</Title>
    </Fragment>
  );
};

export default Job;
