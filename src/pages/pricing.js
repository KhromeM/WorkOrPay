import React from "react";
import Meta from "./../components/Meta";
import PricingSection from "./../components/PricingSection";

function PricingPage(props) {
  return (
    <>
      <Meta title="Pricing" />
      <PricingSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Pricing"
        subtitle=''
      />
    </>
  );
}

export default PricingPage;
