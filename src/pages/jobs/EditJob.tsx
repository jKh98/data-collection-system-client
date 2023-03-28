import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { message, Result } from "antd";
import { collection, doc, setDoc } from "firebase/firestore";

import JobForm from "./forms/JobForm";

import Splash from "&components/Splash";
import { auth, store } from "&config/firebase";
import { JobStatus, SearchJob } from "&types/index";
import { removeDeepEmpty } from "&utils/transform";

const EditJob = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [jobDoc, loading, error] = useDocument(doc(store, "jobs", id!));
  const [submitting, setSubmitting] = useState(false);
  const job = jobDoc?.data() as SearchJob;

  const initialValues: SearchJob = job || {
    id: undefined,
    userId: user!.uid,
    name: "",
    description: "",
    query: { q: "" },
    schedule: { interval: "" },
    status: JobStatus.PROCESSING,
  };

  const onSubmit = (values: typeof initialValues) => {
    const jobRef = doc(collection(store, "jobs"), id!);
    const updatedJob: SearchJob = {
      ...values,
      id: jobRef.id,
      userId: user!.uid,
      status: JobStatus.PROCESSING,
      createdTime: new Date(),
      lastUpdatedTime: new Date(),
    };

    setSubmitting(true);
    setDoc(jobRef, removeDeepEmpty(updatedJob))
      .then(() => message.success("Job updated successfully"))
      .catch((error) => message.error(error.message))
      .finally(() => setSubmitting(false));
  };

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
    <JobForm
      submitting={submitting}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};

export default EditJob;
