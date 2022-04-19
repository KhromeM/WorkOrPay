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
import cash from "../resources/cash.svg";
import construction from "../resources/construction.svg";
import checkup from "../resources/checkup.svg";
import selfie from "../resources/selfie.svg";
import clock from "../resources/clock.svg"
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
      title: "Form a Contract",
      description:
        "Some days you can run a marathon. Other days it's a struggle to get out of bed. Our contracts provide an external source of motivation so you stay on track to meet your goals.",
      image: contract,
    },
    {
      title: "Choose a Goal",
      description:
        "Want to be more productive? Exercise daily? Study more? We will help you pick a concrete goal that can be tracked.",
      image: runner,
    },
    {
      title: "Set a Deadline",
      description:
        "How long do you have to achieve your goal? Choose a deadline as short as 3 days or as long as a month!",
      image: clock,
    },
    {
      title: "Set the Stakes",
      description:
        "If you are serious about your goal, then put some stakes on it! Wager from $25 to $1000. If you fail to reach your target, your money is donated to a charity of your choosing.",
      image: cash,
    },
    {
      title: "Daily Check Ups",
      description:
        "We check up on you everyday to encourage you and make sure you are staying on track. Having someone hold you accountable significantly increases the chances of you hitting your targets.",
      image: checkup,
    },
    {
      title: "Verification",
      description:
        "If you report you have achieved your goal, we verify your claims. We are committed to providing actual accountability.",
      image: selfie,
    },
    // {
    //   title: "Coming Soon",
    //   description:
    //     "Multiple goals and contracts. Daily check ups by FaceTime/Zoom/Phone calls. Customized plans. Progression tracking. Periodic reminders.",
    //   image: construction,
    // },
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
          size={3}
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
        {/* <Box
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
          </Box>
          <Button
            style={{
              width: 182,
              height: 50,
              fontSize: "21px",
              marginTop: "25px",
            }}
            component={Link}
            to={props.button2Path}
            variant="contained"
            size="large"
            color={props.buttonColor}
          >
            Contact Us
          </Button>
        </Box> */}
      </Container>
    </Section>
  );
}

export default FeaturesSection;
