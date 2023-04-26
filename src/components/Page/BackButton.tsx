import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => navigate(-1)}
      style={{
        marginRight: "1.0rem",
        color: "rgba(0, 0, 0, 0.85)",
        verticalAlign: "middle",
      }}
    >
      <ArrowLeftOutlined
        style={{ fontSize: "1.4rem", verticalAlign: "middle" }}
      />
    </Link>
  );
};
