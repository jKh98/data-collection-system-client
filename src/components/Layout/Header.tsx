import React, { Fragment } from "react";
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
    <Fragment>
      <Layout.Header style={{ padding: "0 36px" }}>
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
          <Typography.Text
            style={{ marginLeft: 10 }}
            type="secondary"
          ></Typography.Text>
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
      <Typography.Text
        style={{
          padding: "0 36px",
          fontSize: "6px",
          lineHeight: "8px",
          backgroundColor: "#faad14",
          color: "black",
        }}
      >
        This website shows what others said, wrote, drew, or made. The content
        is not owned or controlled by this website.
      </Typography.Text>
    </Fragment>
  );
};
