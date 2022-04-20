import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import DashboardItems from "./DashboardItems.js";
import DailySubmission from "./BehindLogin/DailySubmission.js";
// import Streaks from "./Streaks";
import { Link, useRouter } from "./../util/router";
import { useAuth } from "./../util/auth";
import { Button, CircularProgress } from "@material-ui/core";
import contact from "../util/contact";
import { updateUser } from "../util/db";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function DashboardSection(props) {
  const classes = useStyles();
  const [pending, setPending] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const data = {
    name: auth.user.name,
    email: auth.user.email,
    message: "User has completed their contract. Verify it.",
  };
  const onSubmit = () => {
    // Show pending indicator
    setPending(true);

    contact
      .submit(data)
      .then(() => {
        updateUser(auth.user.uid, { button: "disable" });
      })
      .then(() => {
        // Clear form
        //reset();
        // Show success alert message
        alert("Great Job! We will contact you for verification shortly.");
      })
      .catch((error) => {
        // Show error alert message
        alert(error.message);
      })
      .finally(() => {
        // Hide pending indicator
        // setPending(false);
      });
  };

  const message = `You are now subscribed to the ${auth.user.planId} plan `;
  const message2 = "You have formed a contract. Good Luck!";

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />

        {router.query.paid && auth.user.planIsActive && (
          <Box mx="auto" mb={4} maxWidth={400}>
            <Alert severity="success">
              {auth.user.hasContract ? message2 : message}
              <span
                role="img"
                aria-label="party"
                style={{ marginLeft: "10px" }}
              >
                🥳
              </span>
            </Alert>
            }
          </Box>
        )}
        {JSON.stringify(auth.user.stripeContractPurchaseDate)}
        <Grid container={true} spacing={4}>
          {/* <Grid item={true} xs={12} md={6}>
            <Streaks />
          </Grid> */}
          {/* <Grid item={true} xs={12} md={6}>
            <DashboardItems />
          </Grid> */}
          <Grid item={true} xs={12} md={6}>
            <DailySubmission />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Box>
                  <Typography variant="h6" paragraph={true}>
                    <strong>
                      {auth.user.displayName
                        ? `Welcome back, ${auth.user.displayName}`
                        : "Welcome stranger! Go to settings to add your name!"}
                    </strong>
                  </Typography>
                  <Typography paragraph={true}></Typography>
                  <Box mt={3}>
                    <Typography variant="h6" paragraph={true}>
                      <strong>User info</strong>
                    </Typography>
                    <Typography component="div">
                      <div>
                        You are signed in as <strong>{auth.user.email}</strong>.
                      </div>

                      {auth.user.stripeSubscriptionId && (
                        <>
                          <div>
                            You are subscribed to the{" "}
                            <strong>{auth.user.planId} plan</strong>.
                          </div>
                          <div>
                            Your plan status is{" "}
                            <strong>
                              {auth.user.stripeSubscriptionStatus}
                            </strong>
                            .
                          </div>
                        </>
                      )}

                      <div>
                        You can change your account info{` `}
                        {auth.user.stripeSubscriptionId && <>and plan{` `}</>}
                        in{` `}
                        <LinkMui component={Link} to="/settings/general">
                          <strong>settings</strong>
                        </LinkMui>
                        .
                      </div>

                      {!auth.user.stripeSubscriptionId && (
                        <div>
                          You can signup for a plan in{" "}
                          <LinkMui component={Link} to="/pricing">
                            <strong>pricing</strong>
                          </LinkMui>
                          .
                        </div>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {/* generate contract button below */}
          <Grid
            style={{ paddingTop: "80px", textAlign: "center" }}
            item={true}
            xs={12}
            md={6}
          >
            {!auth.user.button && auth.user.hasContract && (
              <div>
                Press this button when you have achieved your goal as stated in
                the contract:
                <br />
                <Button
                  style={{ marginTop: "20px" }}
                  variant="contained"
                  size="medium"
                  color="secondary"
                  // component={Link}
                  onClick={onSubmit}
                >
                  {pending ? (
                    <CircularProgress color="success" />
                  ) : (
                    <strong>Submit for verification</strong>
                  )}
                </Button>
              </div>
            )}

            {!auth.user.button && !auth.user.hasContract && (
              <Button
                style={{ marginTop: "20px" }}
                variant="contained"
                size="medium"
                color="secondary"
                component={Link}
                to="/generatecontract"
              >
                <strong>Generate Contract</strong>
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default DashboardSection;
