import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "antd/es/layout";

import { Paths } from "&constants/paths";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header
      style={{ color: "white", fontWeight: "bold", cursor: "pointer" }}
      onClick={() => navigate(Paths.Home)}
    >
      Data Collection System
    </Layout.Header>
  );
};
