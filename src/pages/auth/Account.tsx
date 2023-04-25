import { useAuthState } from "react-firebase-hooks/auth";
import { Card } from "antd";

import DataRow from "&components/DataRow";
import { auth } from "&config/firebase";

export function Account() {
  const [user] = useAuthState(auth);

  return (
    <Card title="Account">
      <DataRow title="Email" value={user?.email} />
      <DataRow title="Name" value={user?.displayName} />
    </Card>
  );
}
