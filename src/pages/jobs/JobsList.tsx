import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { generatePath, useNavigate } from "react-router-dom";
import { Button, Result, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { collection, query, where } from "firebase/firestore";

import JobActions from "./JobActions";

import { PageHeader } from "&components/Page";
import { auth, store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { Paths } from "&constants/paths";

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
      render: (status: jobStatus) => (
        <Tag color={StatusColors[status]}>{status}</Tag>
      ),
    },
    {
      title: "Last Run Time",
      dataIndex: "lastRunTime",
      key: "lastRunTime",
      render: (lastRunTime) => lastRunTime?.toLocaleString() || "-",
      sorter: (a, b) =>
        Date.parse(a.lastRunTime || "") - Date.parse(b.lastRunTime || ""),
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
      <PageHeader
        title="Jobs"
        extra={[
          <Button key="new-job" type="primary" onClick={goToNewJob}>
            New Job
          </Button>,
        ]}
      />

      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey={"id"}
        onRow={(record) => ({
          onClick: () => navigate(generatePath(Paths.Job, { id: record.id! })),
        })}
      />
    </div>
  );
};

export default JobsList;
