import React from "react";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";

import { BackButton } from "./BackButton";

interface PageHeaderProps {
  title: string;
  titleExtra?: React.ReactNode;
  extra?: React.ReactNode;
  withBack?: boolean;
}

export const PageHeader = ({
  title,
  titleExtra,
  extra,
  withBack = false,
}: PageHeaderProps) => {
  return (
    <Row
      justify={"space-between"}
      align={"middle"}
      style={{ marginBottom: "1.5rem" }}
    >
      <Row gutter={16} justify={"space-between"} align={"middle"}>
        {withBack && (
          <Col>
            <BackButton />
          </Col>
        )}
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>
        </Col>
        <Col>{titleExtra}</Col>
      </Row>
      {extra}
    </Row>
  );
};
