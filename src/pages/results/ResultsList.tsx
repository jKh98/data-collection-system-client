import React, { Fragment, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { Card, Result, Typography } from "antd";
import Search from "antd/es/input/Search";
import Table, { ColumnsType } from "antd/es/table";
import { collection, query, Timestamp, where } from "firebase/firestore";

import ResultsKpis from "./ResultsKpis";

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
  const [search, setSearch] = React.useState<string>("");

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
      result?.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as SearchResult))
        .filter(({ id, title, content, description }) => {
          const searchQuery = search.toLowerCase();
          return (
            id?.toLowerCase().includes(searchQuery) ||
            title.toLowerCase().includes(searchQuery) ||
            content.toLowerCase().includes(searchQuery) ||
            description?.toLowerCase().includes(searchQuery)
          );
        }) as SearchResult[],

    [result, search]
  );

  const columns: ColumnsType<SearchResult> = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 80,
      sorter: (a, b) => a.source.localeCompare(b.source),
      render: (source) => <DataSource source={source as dataSource} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: { showTitle: true },
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title) => <Typography.Text strong>{title}</Typography.Text>,
    },
    {
      title: "Retrieved At",
      dataIndex: "updatedTime",
      key: "updatedTime",
      width: 200,
      render: (updatedTime: Timestamp) => <DateTime timestamp={updatedTime} />,
      sorter: (a, b) =>
        Number(a.updatedTime?.toMillis()) - Number(b.updatedTime?.toMillis()),
    },
  ];

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error) {
    return <Result status="error" title="Error" subTitle={error?.message} />;
  }

  return (
    <Fragment>
      <ResultsKpis results={dataSource} loading={loading} />
      <Card>
        <Search
          placeholder="Search by id, name, description, or content"
          onChange={onSearch}
          style={{ marginBottom: 16 }}
        />
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{ defaultPageSize: 10 }}
          rowKey={"id"}
          onRow={(record) => ({
            onClick: () => navigate(`/results/${record.id}`),
          })}
        />
      </Card>
    </Fragment>
  );
};

export default ResultsList;
