import { ReactNode } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  ScheduleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export const StatusIcons: {
  [K in jobStatus]: ReactNode;
} = {
  running: <SyncOutlined spin />,
  active: <CheckCircleOutlined />,
  stopped: <ExclamationCircleOutlined />,
  failed: <CloseCircleOutlined />,
  finished: <InfoCircleOutlined />,
  scheduled: <ScheduleOutlined />,
};
