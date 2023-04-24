import React, { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { generatePath, useNavigate } from "react-router-dom";
import { Button, Result, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { collection, query, Timestamp, where } from "firebase/firestore";

import JobActions from "./JobActions";

import Source from "&components/DataSource";
import DateTime from "&components/DateTime";
import { PageHeader } from "&components/Page";
import { auth, store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { Paths } from "&constants/paths";
import { scheduleToSeconds } from "&utils/schedule";

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

  const dataSource = useMemo(
    () =>
      result?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SearchJob[],
    [result]
  );

  const columns: ColumnsType<SearchJob> = [
    {
      title: "Sources",
      dataIndex: ["query", "sources"],
      key: "query.sources",
      render: (sources: dataSource[]) => (
        <Space>
          {sources?.map((source) => (
            <Source key={source} source={source} />
          ))}
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <Typography.Text strong>{name}</Typography.Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (description) => (
        <Typography.Text type="secondary">{description}</Typography.Text>
      ),
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      sorter: (a, b) => {
        const aSeconds = scheduleToSeconds(a.schedule);
        const bSeconds = scheduleToSeconds(b.schedule);
        return aSeconds - bSeconds;
      },
      render: ({ interval, unit }) => (
        <Typography.Text code>
          {interval} {unit}
        </Typography.Text>
      ),
    },
    {
      title: "Last Run",
      dataIndex: "lastRunTime",
      key: "lastRunTime",
      render: (lastRunTime: Timestamp) => <DateTime timestamp={lastRunTime} />,
      sorter: (a, b) =>
        Number(a.lastRunTime?.toMillis()) - Number(b.lastRunTime?.toMillis()),
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
          <Button key="1" type="primary" onClick={goToNewJob}>
            New Job
          </Button>,
        ]}
      />

      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey={"id"}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => navigate(generatePath(Paths.Job, { id: record.id! })),
        })}
      />
    </div>
  );
};

export default JobsList;
