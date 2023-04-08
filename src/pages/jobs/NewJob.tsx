import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { message } from "antd";
import { collection, doc, setDoc } from "firebase/firestore";

import JobForm from "./forms/JobForm";

import { auth, store } from "&config/firebase";
import { removeDeepEmpty } from "&utils/transform";

const NewJob = () => {
  const [user] = useAuthState(auth);
  const [submitting, setSubmitting] = useState(false);

  const initialValues: SearchJob = {
    id: undefined,
    userId: user!.uid,
    name: "",
    description: "",
    query: { q: "", sources: [] },
    schedule: { interval: 0, unit: "seconds" },
    status: "active",
  };

  const onSubmit = (values: typeof initialValues) => {
    const newJobRef = doc(collection(store, "jobs"));
    const newJob: SearchJob = {
      ...values,
      id: newJobRef.id,
      userId: user!.uid,
      status: "active",
      createdTime: new Date().toISOString(),
    };

    setSubmitting(true);
    setDoc(newJobRef, removeDeepEmpty(newJob))
      .then(() => message.success("Job created successfully"))
      .catch((error) => message.error(error.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <JobForm
      submitting={submitting}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};

export default NewJob;
