import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Section from "./Section";
import { Link } from "./../util/router";
import LegalTerms from "./LegalTerms";
import LegalPrivacy from "./LegalPrivacy";

function LegalSection(props) {
  const validSections = {
    "terms-of-service": true,
    "privacy-policy": true,
  };

  const section = validSections[props.section]
    ? props.section
    : "terms-of-service";

  const data = {
    domain: "company.com",
    companyName: "Company",
  };

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Tabs
        value={section}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
      >
        <Tab
          component={Link}
          to="/legal/terms-of-service"
          label="Terms of Service"
          value="terms-of-service"
        />
        <Tab
          component={Link}
          to="/legal/privacy-policy"
          label="Privacy Policy"
          value="privacy-policy"
        />
      </Tabs>
      <Box mt={5}>
        <Container>
          {section === "terms-of-service" && <LegalTerms {...data} />}

          {section === "privacy-policy" && <LegalPrivacy {...data} />}
        </Container>
      </Box>
    </Section>
  );
}

export default LegalSection;
