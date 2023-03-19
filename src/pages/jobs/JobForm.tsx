import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";

import { JobStatus, SearchJob } from "&types/index";

const JobForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState<SearchJob>();

  useEffect(() => {
    if (id) {
      // TODO: fetch job from API
      setJob({
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
      });
    }
  }, [id]);

  const initialValues = job || {
    name: "",
    description: "",
    query: {
      include: [],
      exclude: [],
      query: "",
      from: new Date(),
      to: new Date(),
    },
    schedule: {
      interval: 1,
      unit: "days",
    },
    status: JobStatus.INACTIVE,
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div>
      <Title level={2}>{id ? `Edit Job: ${id}` : `New Job`}</Title>
      <Form name="job" onFinish={onSubmit} initialValues={initialValues}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="query" label="Query">
          <Input />
        </Form.Item>
        <Form.Item name="schedule" label="Schedule">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default JobForm;
