import React from "react";

import Profile from "../../../components/Dashboard/components/Profile";
import Password from "../../../components/Dashboard/components/Password";
import Permissions from "../../../components/Dashboard/components/Permissions";

const Settings = () => {
  return (
    <div className="space-y-5">
      <Profile />
      <Permissions />
      <Password />
    </div>
  );
};

export default Settings;
