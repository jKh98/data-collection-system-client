import React from "react";
import { Row } from "antd";
import Title from "antd/es/typography/Title";

import { BackButton } from "./BackButton";

interface PageHeaderProps {
  title: string | React.ReactNode;
  extra?: React.ReactNode;
  withBack?: boolean;
}

export const PageHeader = ({
  title,
  extra,
  withBack = false,
}: PageHeaderProps) => {
  return (
    <Row
      justify={"space-between"}
      align={"middle"}
      style={{ marginBottom: "1.5rem" }}
    >
      <Row justify={"space-between"} align={"middle"}>
        {withBack && <BackButton />}
        <Title level={2} style={{ margin: 0 }}>
          {title}
        </Title>
      </Row>
      {extra}
    </Row>
  );
};
