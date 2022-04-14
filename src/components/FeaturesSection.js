import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import runner from "../resources/runner.svg";
import contract from "../resources/contract.svg";
import selfie from "../resources/selfie.svg";
import construction from "../resources/construction.svg";
import checkup from "../resources/checkup.svg";
import sleep from "../resources/sleep.svg";
import { Button } from "@material-ui/core";
import { Link } from "./../util/router";

const useStyles = makeStyles((theme) => ({
  itemsContainer: {
    marginTop: 60,
  },
  row: {
    // Reverse every other row
    "&:nth-of-type(even)": {
      flexDirection: "row-reverse",
    },

    // Spacing between rows
    "&:not(:last-child)": {
      marginBottom: `${theme.spacing(3)}px`,
    },
  },
  description: {
    fontWeight: 500,
  },
  figure: {
    maxWidth: 300,
    margin: "30px auto",
  },
  image: {
    height: "auto",
    maxWidth: "100%",
  },
}));

function FeaturesSection(props) {
  const classes = useStyles();

  const items = [
    {
      title: "Motivation Is Variable",
      description:
        "Somedays you can run a marathon. Other days it's a struggle to get out of bed. We are here to provide an external source of motivation so you stay on target to meet your goals.",
      image: sleep,
    },
    {
      title: "Choose Goals",
      description:
        "Want to be more productive? Exercise daily? Study more? Envariance allows you choose any goal that you wish to work on.",
      image: runner,
    },
    {
      title: "Form A Contract",
      description:
        "Once you decide on your specific goal, you and Envariance will form a contract. You will agree to meet atleast the minimum thresholds of the contract, and this can range anywhere from simply committing to a habit daily or a predefined weight loss number. You'd agree to deliver penalties if you fail to do so, but we will guide you throughout the whole journey to make sure you don't have to deliver such penalties.",
      image: contract,
    },
    {
      title: "Choose Your Penalty",
      description:
        "Choose from a variety of possible penalties. What will motivate you the most? Losing money? Donating to a cause you hate? Being tagged in an embarassing post on social media? A stern lecture from one of our employees? Envariance has a multitude of options for you, modest to severe and everything in between. You decide.",
      image: selfie,
    },
    {
      title: "Daily Check Up",
      description:
        "Accountability to help you stick to your goals. Envariance has a system where you can report your progress everyday or every couple of days, just to let you check in with us and help you stay on track or get back on track when you struggle. We do this whether by text, online messaging, voice call, or even video chat- we cater to your preferred way to ensure you're still on the grind. Having someone look over your shoulder (virtually) significantly increases the chances of you hitting your targets.",
      image: checkup,
    },
    {
      title: "Coming Soon",
      description:
        "Daily check ups by FaceTime/Zoom/Phone calls. Customized plans. Progression tracking.",
      image: construction,
    },
  ];

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
        <Container
          maxWidth="md"
          disableGutters={true}
          className={classes.itemsContainer}
        >
          {items.map((item, index) => (
            <Grid
              className={classes.row}
              container={true}
              item={true}
              alignItems="center"
              spacing={4}
              key={index}
            >
              <Grid item={true} xs={12} md={6}>
                <Box
                  textAlign={{
                    xs: "center",
                    md: "left",
                  }}
                >
                  <Typography variant="h2" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item={true} xs={12} md={6}>
                <figure className={classes.figure}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={classes.image}
                  />
                </figure>
              </Grid>
            </Grid>
          ))}
        </Container>
        <Box
          sx={{ fontSize: "50px", fontWeight: "500", mt: "60px" }}
          textAlign={{ xs: "center", md: "center" }}
        >
          {props.buttonAboveText}
          <Box sx={{ mt: "20px" }} textAlign={{ xs: "center", md: "center" }}>
            <Button
              style={{ width: 150, height: 75, fontSize: "35px" }}
              component={Link}
              to={props.buttonPath}
              variant="contained"
              size="large"
              color={props.buttonColor}
            >
              {props.buttonText}
            </Button>{" "}
            {/* <Button
              style={{ width: 280, height: 75, fontSize: "35px" }}
              component={Link}
              to={props.button2Path}
              variant="contained"
              size="large"
              color={props.buttonColor}
            >
              Contact Us
            </Button> */}
          </Box>
        </Box>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
