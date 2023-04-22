import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  EditOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";

import { Paths } from "&constants/paths";

interface JobActionsProps {
  id: string;
  status: jobStatus;
}

const JobActions = ({ id, status }: JobActionsProps) => {
  const navigate = useNavigate();

  const goToEditPage = () => navigate(generatePath(Paths.JobEdit, { id }));

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: goToEditPage,
    },
    {
      label: "Run",
      key: "2",
      icon: <PlayCircleOutlined />,
    },
    {
      label: "Stop",
      key: "3",
      icon: <StopOutlined />,
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
    <Dropdown menu={menuProps}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Space>
          Actions
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default JobActions;
