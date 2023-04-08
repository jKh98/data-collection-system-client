import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  EditOutlined,
  PauseCircleOutlined,
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

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: (e) => navigate(generatePath(Paths.JobEdit, { id })),
    },
    {
      label: "Run",
      key: "2",
      icon: <PlayCircleOutlined />,
    },
    {
      label: "Pause",
      key: "3",
      icon: <PauseCircleOutlined />,
      danger: true,
    },
    {
      label: "Stop",
      key: "4",
      icon: <StopOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const menuProps: MenuProps = { items };

  return (
    <Dropdown menu={menuProps}>
      <Button onClick={(e) => e.stopPropagation()}>
        <Space>
          Actions
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default JobActions;
