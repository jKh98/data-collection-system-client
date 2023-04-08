import React, { FC, PropsWithChildren } from "react";
import Layout from "antd/es/layout";

export const Content: FC<PropsWithChildren<{}>> = (props) => {
  return (
    <Layout.Content
      style={{
        padding: "24px",
        height: "calc(100vh - 64px)",
        overflow: "auto",
      }}
    >
      {props?.children}
    </Layout.Content>
  );
};
