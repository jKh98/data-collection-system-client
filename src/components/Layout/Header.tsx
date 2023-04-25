import React from "react";
import { useNavigate } from "react-router-dom";
import { RobotOutlined } from "@ant-design/icons";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Typography } from "antd";
import Layout from "antd/es/layout";

import { auth } from "&config/firebase";
import { Paths } from "&constants/paths";

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => auth.signOut();

  const goToAccountPage = () => navigate(Paths.Account);

  const items: MenuProps["items"] = [
    {
      label: "Account",
      key: "0",
      icon: <UserOutlined />,
      onClick: goToAccountPage,
    },
    {
      label: "Logout",
      key: "1",
      icon: <LogoutOutlined />,
      onClick: logout,
      danger: true,
    },
  ];

  const menuProps: MenuProps = {
    items,
    onClick: (info) => {
      info.domEvent.stopPropagation();
      info.domEvent.preventDefault();
    },
  };

  return (
    <Layout.Header>
      <Typography.Link
        style={{
          color: "white",
          fontSize: "20px",
          lineHeight: "20px",
          userSelect: "none",
          verticalAlign: "middle",
        }}
        onClick={() => navigate(Paths.Home)}
      >
        <RobotOutlined style={{ marginRight: 10 }} />
        DataFetchr
      </Typography.Link>
      <Dropdown menu={menuProps} trigger={["click"]}>
        <Button
          type="text"
          style={{
            float: "right",
            color: "white",
            fontSize: "20px",
            height: "100%",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <SettingOutlined color="white" />
        </Button>
      </Dropdown>
    </Layout.Header>
  );
};
