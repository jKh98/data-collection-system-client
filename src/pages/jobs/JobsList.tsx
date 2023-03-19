import React, { useState } from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";

import { StatusColors } from "&constants/colors";
import { JobStatus, SearchJob } from "&types/index";

const mockJobs: SearchJob[] = [
  {
    id: "1",
    name: "Job 1",
    description: "Job 1 description",
    query: {
      include: ["include 1", "include 2"],
      exclude: ["exclude 1", "exclude 2"],
      query: "query 1",
      from: new Date(),
      to: new Date(),
    },
    schedule: {
      interval: 1,
      unit: "days",
    },
    status: JobStatus.INACTIVE,
    lastUpdatedTime: new Date(),
  },
  {
    id: "2",
    name: "Job 2",
    description: "Job 2 description",
    query: {
      include: ["include 1", "include 2"],
      exclude: ["exclude 1", "exclude 2"],
      query: "query 1",
      from: new Date(),
      to: new Date(),
    },
    schedule: {
      interval: 1,
      unit: "days",
    },
    status: JobStatus.ACTIVE,
    lastUpdatedTime: new Date(),
  },
  {
    id: "3",
    name: "Job 3",
    description: "Job 3 description",
    query: {
      include: ["include 1", "include 2"],
      exclude: ["exclude 1", "exclude 2"],
      query: "query 1",
      from: new Date(),
      to: new Date(),
    },
    schedule: {
      interval: 15,
      unit: "seconds",
    },
    status: JobStatus.INACTIVE,
    lastUpdatedTime: new Date(),
  },
];

const JobsList = () => {
  const [jobs, setJobs] = useState(mockJobs);

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
  ];

  return (
    <div>
      <Title level={2}>Jobs</Title>
      <Table dataSource={jobs} columns={columns} />
    </div>
  );
};

export default JobsList;
