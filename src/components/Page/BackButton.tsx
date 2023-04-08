import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} type="text" size="large">
      <ArrowLeftOutlined
        style={{
          fontSize: "1.2rem",
        }}
      />
    </Button>
  );
};
