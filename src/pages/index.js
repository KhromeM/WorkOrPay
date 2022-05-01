import React from "react";
import Meta from "./../components/Meta";
import HeroSection from "./../components/HeroSection";
import ClientsSection from "./../components/ClientsSection";
import FeaturesSection from "./../components/FeaturesSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import { useDarkMode } from "../util/theme";
import logo from "../resources/logo.svg";
import "../resources/index.css";
import FaqSection from "../components/FaqSection";
import HowItWorks from "../components/HowItWorks";
import ScrollToTop from "../components/ScrollToTop";
import ForMe from "../components/ForMe.js";
import Odometer from "../components/Odometer";
import { Divider } from "@material-ui/core";
function IndexPage(props) {
  const darkMode = useDarkMode();
  return (
    <>
      <Meta />
      <HeroSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Meet Your Goals Or Pay The Price"
        subtitle="Set goals. Form contracts. Pay the penalty if you fail."
        image={logo}
        buttonText="Start Now"
        buttonColor="primary"
        buttonPath="/auth/signup"
      />
      {/* <ClientsSection
        bgColor="light"
        size="normal"
        bgImage=""
        bgImageOpacity={1}
        title=""
        subtitle=""
      /> */}
      <Odometer />
      <Divider style={{ marginTop: "5vh" }} />

      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="We do not profit if you fail"
        subtitle="Our incentives are aligned"
        buttonText="Sign Up"
        buttonColor="primary"
        buttonPath="/auth/signup"
      />
      {/* <HowItWorks
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
      /> */}
      {/* <TestimonialsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      /> */}
      <ForMe />

      <FaqSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
      />
      {/* <NewsletterSection
          bgColor="default"
          size="medium"
          bgImage=""
          bgImageOpacity={1}
          title="Subscribe to our newsletter!"
          subtitle="Be the first to know when we release new features"
          buttonText="Subscribe"
          buttonColor="primary"
          inputPlaceholder="Enter your email"
          subscribedMessage="You are now subscribed!"
        /> */}

      <ScrollToTop />
    </>
  );
}

export default IndexPage;
