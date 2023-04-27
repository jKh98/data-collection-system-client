import React, { Fragment, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { generatePath, useNavigate } from "react-router-dom";
import { Button, Result, Space, Table, Tag, Typography } from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import { collection, query, Timestamp, where } from "firebase/firestore";

import JobActions from "./JobActions";
import JobsKpis from "./JobsKpis";

import Source from "&components/DataSource";
import DateTime from "&components/DateTime";
import { PageHeader } from "&components/Page";
import { auth, store } from "&config/firebase";
import { StatusColors } from "&constants/colors";
import { StatusIcons } from "&constants/icons";
import { Paths } from "&constants/paths";
import { scheduleToSeconds } from "&utils/schedule";

const JobsList = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const [search, setSearch] = React.useState<string>("");

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
      result?.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as SearchJob))
        .filter(({ id, name, description }) => {
          const searchQuery = search.toLowerCase();
          return (
            id?.toLowerCase().includes(searchQuery) ||
            name.toLowerCase().includes(searchQuery) ||
            description.toLowerCase().includes(searchQuery)
          );
        }) as SearchJob[],

    [result, search]
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
        <Tag icon={StatusIcons[status]} color={StatusColors[status]}>
          {status}
        </Tag>
      ),
    },
    {
      render: (_, { id, status }) =>
        id && <JobActions size="small" id={id} status={status} />,
    },
  ];

  const goToNewJob = () => navigate(Paths.JobNew);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error) {
    return <Result status="error" title="Error" subTitle={error?.message} />;
  }

  return (
    <Fragment>
      <PageHeader
        title="Jobs"
        extra={[
          <Button key="1" type="primary" onClick={goToNewJob}>
            New Job
          </Button>,
        ]}
      />

      <JobsKpis jobs={dataSource} loading={loading} />

      <Search
        placeholder="Search by id, name, or description"
        onChange={onSearch}
        style={{ marginBottom: 16 }}
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
    </Fragment>
  );
};

export default JobsList;
