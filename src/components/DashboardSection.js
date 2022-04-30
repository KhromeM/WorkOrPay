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
import { useTheme } from "@material-ui/core";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import DashboardItems from "./DashboardItems.js";
// import Milestones from "./BehindLogin/Milestones.js";
// import Streaks from "./Streaks";
import { Link, useRouter } from "./../util/router";
import { useAuth } from "./../util/auth";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  Modal,
} from "@material-ui/core";
import { updateUser } from "../util/db";
import Contract from "./BehindLogin/Contract.js";
import SimpleAccordion from "./SimpleAccordion";
import {
  updateContract as updateItem,
  deleteContract as deleteItem,
  useContractsByOwner as useItemsByOwner,
} from "../util/db";
import { useDarkMode } from "../util/theme";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function DashboardSection(props) {
  const classes = useStyles();
  const theme = useTheme();
  const auth = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(router.query.paid && true);
  const [openNewUser, setOpenNewUser] = useState(router.query.newuser && true);

  const {
    data: items,
    status: itemsStatus,
    error: itemsError,
  } = useItemsByOwner(auth.user.uid);

  console.log(theme.palette.type, "theme");
  console.log(theme.palette.type == "light", "light theme true?");
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
        <Dialog
          className={classes.backdrop}
          // BackdropProps={{ style: { backgroundColor: "#cccccc" } }}
          open={open}
          // onClick={() => {
          //   setOpen(false);
          // }}
        >
          <Grid style={{ textAlign: "center" }} item={true} xs={12} md={12}>
            <div
              style={{
                // backgroundColor: "lightgray",
                paddingTop: "20px",
                paddingBottom: "15px",
                margin: "7vw",
                borderRadius: "25px",
              }}
            >
              {(!auth.user.hasContract || auth.user.hasContract < 3) && (
                <div style={{ margin: "-1em", marginBottom: "0.25em" }}>
                  <div style={{ marginBottom: "9px", fontSize: "1.75em" }}>
                    <strong>
                      Thank you so much for subscribing to WorkOrPay! <br />
                      <br /> We're so excited to finally get you started on
                      achieving your goals with us! <br />
                      <br /> To begin, please click the create contract button.
                    </strong>
                    <br />
                    <br />
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
            </div>
          </Grid>
        </Dialog>
        <Backdrop
          className={classes.backdrop}
          open={openNewUser}
          // onClick={() => {
          //   setOpenNewUser(false);
          // }}
        >
          <Grid style={{ textAlign: "center" }} item={true} xs={12} md={12}>
            <div
              style={{
                backgroundColor:
                  theme.palette.type == "light" ? "#1a1a1a" : "darkgray",
                padding: "30px",
                margin: "5vw",
                borderRadius: "30px",
              }}
            >
              <div style={{ margin: "-1em", marginBottom: "1em" }}>
                <div style={{ marginBottom: "9px", fontSize: "1.5em" }}>
                  <strong>
                    Thank you so much for signing up for WorkOrPay!
                    <br />
                    <br /> Please check out our pricing options:
                  </strong>
                </div>
                <div>
                  <Button
                    style={{
                      marginBottom: "20px",
                      flex: "0",
                      fontSize: "1.35em",
                      backgroundColor: "#00B0FF", //props.bgColor, //"#00B0FF",
                    }}
                    variant="contained"
                    size="medium"
                    component={Link}
                    to="/pricing"
                  >
                    <strong>Go to Pricing</strong>
                  </Button>
                </div>
                <br />
                <strong style={{ fontSize: "1.5em" }}>
                  You won't be able to use WorkOrPay without a subscription.
                </strong>
              </div>
            </div>
          </Grid>
        </Backdrop>
        <Grid style={{ textAlign: "center" }} item={true} xs={12} md={12}>
          {(!auth.user.hasContract || auth.user.hasContract < 3) && (
            <div style={{ margin: "-1em", marginBottom: "1em" }}>
              <div style={{ marginBottom: "9px" }}>
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
          {
            //  STREAKS
            /* <Grid item={true} xs={12} md={6}>
            <Streaks />
          </Grid> */
          }

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

          {items &&
            items.map((contract) => {
              return (
                <Grid item={true} xs={12} md={6}>
                  <Contract contract={contract} />
                </Grid>
              );
            })}

         
        </Grid>
      </Container>
    </Section>
  );
}

export default DashboardSection;
