import React from "react";
import Meta from "./../components/Meta";
import ContactSection from "./../components/ContactSection";

function ContactPage(props) {
  return (
    <>
      <Meta title="Contact" />
      <ContactSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Contact Us"
        subtitle="Feel free to ask any question. We answer all questions."
        buttonText="Send message"
        buttonColor="primary"
        showNameField={true}
      />
    </>
  );
}

export default ContactPage;
