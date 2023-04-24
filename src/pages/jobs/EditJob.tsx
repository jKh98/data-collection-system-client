import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { message, Result } from "antd";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import JobForm from "./forms/JobForm";

import Splash from "&components/Splash";
import { auth, store } from "&config/firebase";
import { scheduleToSeconds } from "&utils/schedule";
import { removeDeepEmpty } from "&utils/transform";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const jobRef = doc(store, "jobs", id!);
  const [jobDoc, loading, error] = useDocument(jobRef);
  const [submitting, setSubmitting] = useState(false);
  const job = jobDoc?.data() as SearchJob;

  const initialValues: SearchJob = job || {
    id: undefined,
    userId: user!.uid,
    name: "",
    description: "",
    query: { q: "" },
    schedule: { interval: 0, unit: "seconds" },
    status: "active",
  };

  const onSubmit = (values: typeof initialValues) => {
    const updatedJob: SearchJob = {
      ...values,
      id: jobRef.id,
      userId: user!.uid,
      status: "active",
      lastUpdatedTime: Timestamp.now(),
      nextRunTime: Timestamp.fromDate(
        new Date(Date.now() + scheduleToSeconds(values?.schedule!) * 1000)
      ),
    };

    setSubmitting(true);
    setDoc(jobRef, removeDeepEmpty(updatedJob))
      .then(() => message.success("Job updated successfully"))
      .catch((error) => message.error(error.message))
      .finally(() => {
        setSubmitting(false);
        navigate(-1);
      });
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
