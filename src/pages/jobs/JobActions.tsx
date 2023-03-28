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
import { JobStatus } from "&types/index";

interface JobActionsProps {
  id: string;
  status: JobStatus;
}

const JobActions = ({ id, status }: JobActionsProps) => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: () => {
        console.log(id);
        const path = generatePath(Paths.JobEdit, { id });
        console.log(path);
        navigate(path);
      },
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

  const menuProps = { items };

  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          Actions
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default JobActions;
