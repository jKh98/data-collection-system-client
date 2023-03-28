import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Button, Result, Row, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { collection, query, where } from "firebase/firestore";

import JobActions from "./JobActions";

import { auth, store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { Paths } from "&constants/paths";
import { JobStatus, SearchJob } from "&types/index";

const JobsList = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  /**
   * Get all jobs for the current user
   * There are already sufficient rules in place to ensure that
   * only the current user can access their own jobs
   */
  const [result, loading, error] = useCollection(
    query(collection(store, "jobs"), where("userId", "==", userId))
  );

  const dataSource = result?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SearchJob[];

  const columns: ColumnsType<SearchJob> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      render: (schedule) => (
        <span>
          {schedule.interval} {schedule.unit}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: JobStatus) => (
        <Tag color={StatusColors[status]}>{status}</Tag>
      ),
    },
    {
      title: "Last Run Time",
      dataIndex: "lastRunTime",
      key: "lastRunTime",
      render: (lastRunTime) => lastRunTime?.toLocaleString() || "-",
      sorter: (a, b) =>
        Number(a.lastRunTime?.getTime()) - Number(b.lastRunTime?.getTime()),
    },
    {
      render: (_, { id, status }) =>
        id && <JobActions id={id} status={status} />,
    },
  ];

  const goToNewJob = () => navigate(Paths.JobNew);

  if (error) {
    return <Result status="error" title="Error" subTitle={error?.message} />;
  }

  return (
    <div>
      <Row justify={"space-between"} align={"middle"}>
        <Title level={2}>Jobs</Title>
        <Button type="primary" onClick={goToNewJob}>
          New Job
        </Button>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        key={"id"}
      />
    </div>
  );
};

export default JobsList;
