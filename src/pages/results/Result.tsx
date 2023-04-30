import { Fragment } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Result as AntdResult,
  Row,
  Typography,
} from "antd";
import { doc } from "firebase/firestore";

import DataRow from "&components/DataRow";
import DataSource from "&components/DataSource";
import DateTime from "&components/DateTime";
import { PageHeader } from "&components/Page";
import Splash from "&components/Splash";
import { store } from "&config/firebase";
import { Paths } from "&constants/paths";

const { Text, Link } = Typography;

const Result = () => {
  const { id } = useParams();
  const [resultDoc, loading, error] = useDocument(doc(store, "results", id!));
  const result = resultDoc?.data() as SearchResult;

  if (!id) {
    return <Navigate to={Paths.Jobs} replace />;
  }

  if (loading) {
    return <Splash />;
  }

  if (error) {
    return <AntdResult status="error" title="Error" subTitle={error.message} />;
  }

  if (id && !result) {
    return (
      <AntdResult
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );
  }

  const {
    source,
    title,
    description,
    content,
    url,
    imageUrl,
    pdfUrl,
    publishedAt,
    createdTime,
    updatedTime,
  } = result || {};

  return (
    <Fragment>
      <PageHeader
        title={`Result: ${id}`}
        titleExtra={<DataSource source={source} size={30} />}
        withBack
      />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card title="Details">
            <DataRow title="Title" value={<Text>{title}</Text>} />
            <DataRow
              title="Description"
              value={
                <Text>
                  <div
                    dangerouslySetInnerHTML={{ __html: description || "-" }}
                  />
                </Text>
              }
            />
            <DataRow
              title="URL"
              value={
                <Link href={url} target="_blank">
                  {url}
                </Link>
              }
            />
            <DataRow
              title="Published"
              value={<Text underline>{publishedAt}</Text>}
            />

            <Divider />

            <DataRow
              title="Created"
              value={<DateTime timestamp={createdTime} />}
            />
            <DataRow
              title="Updated"
              value={<DateTime timestamp={updatedTime} />}
            />
          </Card>
          {pdfUrl && (
            <Button
              type="primary"
              href={pdfUrl}
              target="_blank"
              style={{ marginTop: 16, width: "100%" }}
            >
              Download PDF
            </Button>
          )}
          <br />
          <br />
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Card
            cover={imageUrl && <Image alt="" src={imageUrl} sizes="100%" />}
          >
            {content ? (
              <Text>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </Text>
            ) : (
              <Alert message="No text content available" type="warning" />
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Result;
