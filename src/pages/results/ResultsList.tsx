import React, { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Result, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { collection, query, Timestamp, where } from "firebase/firestore";

import DataSource from "&components/DataSource";
import DateTime from "&components/DateTime";
import { auth, store } from "&config/firebase";

interface ResultsProps {
  jobId: string;
}

const ResultsList = ({ jobId }: ResultsProps) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  /**
   * Get all results for the current user
   * There are already sufficient rules in place to ensure that
   * only the current user can access their own results
   */
  const [result, loading, error] = useCollection(
    query(
      collection(store, "results"),
      where("userId", "==", userId),
      where("jobId", "==", jobId)
    )
  );

  const dataSource = useMemo(
    () =>
      result?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SearchResult[],
    [result]
  );

  const columns: ColumnsType<SearchResult> = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 20,
      sorter: (a, b) => a.source.localeCompare(b.source),
      render: (source) => <DataSource source={source as dataSource} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title) => <Typography.Text strong>{title}</Typography.Text>,
    },
    {
      title: "Retrieved At",
      dataIndex: "updatedTime",
      key: "updatedTime",
      width: 150,
      render: (updatedTime: Timestamp) => (
        <DateTime direction="vertical" timestamp={updatedTime} />
      ),
      sorter: (a, b) =>
        Number(a.updatedTime?.toMillis()) - Number(b.updatedTime?.toMillis()),
    },
  ];

  if (error) {
    return <Result status="error" title="Error" subTitle={error?.message} />;
  }

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ResultsList;
