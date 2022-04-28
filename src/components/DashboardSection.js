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
// import Milestones from "./BehindLogin/Milestones.js";
// import Streaks from "./Streaks";
import { Link, useRouter } from "./../util/router";
import { useAuth } from "./../util/auth";
import { Button, CircularProgress } from "@material-ui/core";
import contact from "../util/contact";
import { updateUser } from "../util/db";
import Contract from "./BehindLogin/Contract.js";
import SimpleAccordion from "./SimpleAccordion";
import {
  updateContract as updateItem,
  deleteContract as deleteItem,
  useContractsByOwner as useItemsByOwner,
} from "../util/db";


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
    contract: '',
    message: `User has completed their contract(s). Verify it.`,
  };
  const {
    data: items,
    status: itemsStatus,
    error: itemsError,
  } = useItemsByOwner(auth.user.uid);

  const pickContract = () => {
    //gonna make this a modal eventually
    data.contract = prompt("Which contract have you completed? Example: The one where I had to run 10 miles.")
  }
  const onSubmit = () => {
    // Show pending indicator
    setPending(true);

    //hideContacts()
    if (auth.user.hasContract > 1) {
      pickContract()
    }

    contact
      .submit(data)
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
        setPending(false);
      });
  };

  const message = `You are now subscribed to the ${auth.user.planId} plan `;
  const message2 = "You have formed a contract. Good Luck!";
  // const milestoneText = `Milestones let you add mini goals and targets on the path towards your end goal.`;
  // const milestoneText2 = `Example: If
  // your main goal is to study for a total of 45 hours in 3 weeks. You
  // may want to set up 2 milestones: "Study for 15 hours by the end of
  // week 1" and "Study for 30 hours by the end of week 2". We contact
  // you after the milestone dates to make sure you are staying on track.`;
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
        <Grid style={{ textAlign: "center" }} item={true} xs={12} md={12}>
          {( !auth.user.hasContract || (auth.user.hasContract < 3) ) && (
            <div style={{ margin: "-1em", marginBottom: "1em" }}>
              <div style={{  marginBottom: "9px" }}>
                <strong>To get started, form a contract</strong>
              </div>
              <div>
                <Button
                  style={{
                    marginBottom: "20px",
                    flex: "0",
                    fontSize: "1.35em",
                    backgroundColor: "#00B0FF",
                  }}
                  variant="contained"
                  size="medium"
                  component={Link}
                  to="/generatecontract"
                >
                  <strong>Generate Contract</strong>
                </Button>
              </div>
            </div>
          )}
        </Grid>
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
          </Box>
        )}
        {/* {JSON.stringify(auth.user.stripeContractPurchaseDate)} */}
        <Grid container={true} spacing={4}>
          {/* <Grid item={true} xs={12} md={6}>
            <Streaks />
          </Grid> */}
          {/* <Grid item={true} xs={12} md={6}>
            <DashboardItems />
          </Grid> */}
          {/* <Grid item={true} xs={12} md={12}>
            <Grid item={true} xs={12} md={6}>
              {auth.user.planIsActive && (
                <SimpleAccordion
                  title="What are milestones? 🤔"
                  text={milestoneText}
                  secondtext={milestoneText2}
                  auth={auth}
                />
              )}
            </Grid>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Milestones />
          </Grid> */}


        {items && items.map((contract)=>{
          return(
            <Grid item={true} xs={12} md={6}>
              <Contract contract={contract} />
            </Grid>
          )
        })}

          <Grid
            style={{ paddingTop: "80px", textAlign: "center" }}
            item={true}
            xs={12}
            md={6}
          >
            {auth.user.hasContract && (
            
                <Button
                  style={{ marginTop: "20px" }}
                  variant="contained"
                  size="medium"
                  color="#00B0FF"
                  // component={Link}
                  onClick={onSubmit}
                >
                  {pending ? (
                    <CircularProgress color="success" />
                  ) : (
                    <div>
                      <strong>Submit  a contract for verification</strong>
                    </div>
                  )}
                </Button>
              
            )}
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
                      <strong>User info:</strong>
                    </Typography>
                    <Typography component="div">
                      <div>
                        You are signed in as: <strong>{auth.user.email}</strong>.
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
        </Grid>
      </Container>
    </Section>
  );
}

export default DashboardSection;
