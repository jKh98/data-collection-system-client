import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import Layout from "antd/es/layout";

import { Paths } from "&constants/paths";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header>
      <Typography.Text
        style={{
          color: "white",
          fontSize: "20px",
          lineHeight: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate(Paths.Home)}
      >
        DataFetchr
      </Typography.Text>
    </Layout.Header>
  );
};
