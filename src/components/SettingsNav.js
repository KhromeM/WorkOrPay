import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "./../util/router";

function SettingsNav(props) {
  return (
    <Tabs
      value={props.activeKey}
      indicatorColor="primary"
      textColor="primary"
      centered={true}
    >
      <Tab
        component={Link}
        to="/settings/general"
        label="General"
        value="general"
      />
      <Tab
        component={Link}
        to="/settings/password"
        label="Password"
        value="password"
      />
      <Tab
        component={Link}
        to="/settings/billing"
        label="Billing"
        value="billing"
      />
    </Tabs>
  );
}

export default SettingsNav;
