import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  EditOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message, Space } from "antd";
import { doc, setDoc } from "firebase/firestore";

import { store } from "&config/firebase";
import { Paths } from "&constants/paths";

interface JobActionsProps {
  id: string;
  status: jobStatus;
  size?: "small" | "middle" | "large";
  type?: "primary" | "ghost" | "dashed" | "link" | "text";
}

const JobActions = ({ id, status, size, type }: JobActionsProps) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = React.useState(false);

  const goToEditPage = () => navigate(generatePath(Paths.JobEdit, { id }));

  const changeJobStatus = (newJobStatus: jobStatus) => () => {
    const jobRef = doc(store, "jobs", id!);
    setLoading(true);
    setDoc(jobRef, { status: newJobStatus }, { merge: true })
      .then(() => message.success("Job status updated"))
      .catch((error) => message.error(`Failed to update job status: ${error}`))
      .finally(() => setLoading(false));
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: goToEditPage,
    },
    {
      label: "Start",
      key: "2",
      icon: <PlayCircleOutlined />,
      onClick: changeJobStatus("active"),
      disabled: status === "active",
    },
    {
      label: "Stop",
      key: "3",
      icon: <StopOutlined />,
      danger: true,
      onClick: changeJobStatus("stopped"),
      disabled: status === "stopped",
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
        size={size}
        type={type}
        loading={isLoading}
        disabled={isLoading}
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
