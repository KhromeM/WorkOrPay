import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Section from "./Section";
import ReauthModal from "./ReauthModal";
import SettingsNav from "./SettingsNav";
import SettingsGeneral from "./SettingsGeneral";
import SettingsPassword from "./SettingsPassword";
import SettingsBilling from "./SettingsBilling";
import { useAuth } from "./../util/auth";
import { useRouter } from "../util/router";

function SettingsSection(props) {
  const auth = useAuth();
  const router = useRouter();
  const [formAlert, setFormAlert] = useState(null);

  console.log(router.query.signedup);
  // State to control whether we show a re-authentication flow
  // Required by some security sensitive actions, such as changing password.
  const [reauthState, setReauthState] = useState({
    show: false,
  });

  const validSections = {
    general: true,
    password: true,
    billing: true,
  };

  const section = validSections[props.section] ? props.section : "general";

  // Handle status of type "success", "error", or "requires-recent-login"
  // We don't treat "requires-recent-login" as an error as we handle it
  // gracefully by taking the user through a re-authentication flow.
  const handleStatus = ({ type, message, callback }) => {
    if (type === "requires-recent-login") {
      // First clear any existing message
      setFormAlert(null);
      // Then update state to show re-authentication modal
      setReauthState({
        show: true,
        // Failed action to try again after reauth
        callback: callback,
      });
    } else {
      // Display message to user (type is success or error)
      setFormAlert({
        type: type,
        message: message,
      });
    }
  };
  console.log(auth.user.name);

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {router.query.signedup && auth.user.name == null && (
        <Box mx="auto" mb={4} maxWidth={400}>
          <Alert severity="success">
            Thank you for joining WorkOrPay.
            <br /> We're so excited to get you started!
            <br /> Please add a name below!
            <span role="img" aria-label="party" style={{ marginLeft: "10px" }}>
              🥳
            </span>
          </Alert>
        </Box>
      )}
      {reauthState.show && (
        <ReauthModal
          callback={reauthState.callback}
          provider={auth.user.providers[0]}
          onDone={() => setReauthState({ show: false })}
        />
      )}

      <SettingsNav activeKey={section} />
      <Box mt={5}>
        <Container maxWidth="xs">
          {formAlert && (
            <Box mb={4}>
              <Alert severity={formAlert.type}>{formAlert.message}</Alert>
            </Box>
          )}

          {section === "general" && <SettingsGeneral onStatus={handleStatus} />}

          {section === "password" && (
            <SettingsPassword onStatus={handleStatus} />
          )}

          {section === "billing" && <SettingsBilling onStatus={handleStatus} />}
        </Container>
      </Box>
    </Section>
  );
}

export default SettingsSection;
