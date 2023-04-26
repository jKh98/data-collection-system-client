import { ReactNode } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export const StatusIcons: {
  [K in jobStatus]: ReactNode;
} = {
  running: <SyncOutlined spin />,
  active: <CheckCircleOutlined />,
  stopped: <ExclamationCircleOutlined />,
  failed: <CloseCircleOutlined />,
};
