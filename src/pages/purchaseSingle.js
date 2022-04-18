import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Meta from "./../components/Meta";
import PageLoader from "./../components/PageLoader";
import { useAuth, requireAuth } from "./../util/auth";
import { useRouter } from "./../util/router";
import { redirectToCheckout } from "./../util/stripe";

function PurchasePage(props) {
  const router = useRouter();
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState();

  useEffect(() => {
    if (auth.user.planIsActive && router.query.plan === "starter")
      router.push("/settings/billing");
    // If user already has an active plan
    // then take them to Stripe billing
    // console.log(router.query.plan);
    else {
      // Otherwise go to checkout
      console.log(router.query, "router");
      redirectToCheckoutSingle(router.query.plan, true).catch((error) => {
        setFormAlert({
          type: "error",
          message: error.message,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Meta title="Purchase" />
      <PageLoader>
        {formAlert && (
          <Alert severity={formAlert.type} style={{ maxWidth: "500px" }}>
            {formAlert.message}
          </Alert>
        )}
      </PageLoader>
    </>
  );
}

export default requireAuth(PurchasePage);
