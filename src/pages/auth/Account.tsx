import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Col, Divider, Row } from "antd";
import { Timestamp } from "firebase/firestore";

import DataRow from "&components/DataRow";
import DateTime from "&components/DateTime";
import { PageHeader } from "&components/Page";
import { auth } from "&config/firebase";

export function Account() {
  const [user, loading] = useAuthState(auth);

  return (
    <Fragment>
      <PageHeader title="Account" withBack />
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card title="Details" bordered={false} loading={loading}>
            <DataRow title="ID" value={user?.uid} />
            <DataRow title="Email" value={user?.email} />
            <DataRow title="Name" value={user?.displayName} />
            <Divider />
            <DataRow
              title="Created"
              value={
                <DateTime
                  timestamp={Timestamp.fromDate(
                    new Date(user?.metadata.creationTime!)
                  )}
                />
              }
            />
            <DataRow
              title="Last signed in"
              value={
                <DateTime
                  timestamp={Timestamp.fromDate(
                    new Date(user?.metadata.lastSignInTime!)
                  )}
                />
              }
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
