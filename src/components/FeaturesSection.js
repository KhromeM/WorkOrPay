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
      title: "1) Form a Contract",
      description:
        // "Some days you can run a marathon. On other days it's a struggle to get out of bed. Our contracts provide an external source of motivation so you stay on track to meet your goals.",
        "Our contracts provide external motivation, keeping you on track to meet your goals.",

      image: contract,
    },
    {
      title: " 2) Choose a Goal",
      description:
        // "Want to be more productive? Exercise daily? Study more? We will help you pick a concrete goal that can be tracked.",
        "Want to be more productive? Exercise daily? Launch your business?",
      image: runner,
    },
    {
      title: "3) Set a Deadline",
      description:
        // "How long do you have to achieve your goal? Choose a deadline as short as a day or as long as a month!",
        "Choose a deadline as short as a day or as long as a month.",

      image: clock,
    },
    {
      title: "4) Set the Stakes",
      description:
        // "If you are serious about your goal, then put some stakes on it! Choose a financial or social penalty!",
        "Put some stakes on it! Choose a financial or social penalty!",
      image: cash,
    },
    {
      title: "5) Daily Check Ups",
      description:
        // "We check up on you every day to encourage you and make sure you are staying on track. Having someone hold you accountable significantly increases the chances of you hitting your targets.",
        "We check up on you every day to keep you on track.",

      image: checkup,
    },
    {
      title: "6) Verification",
      description:
        // "If you report you have achieved your goal, we verify your claims. We are committed to providing actual accountability.",
        "When you report you have achieved your goal, we verify your claim.",

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
          <Box sx={{ mt: "20px" }} textAlign={{ xs: "center", md: "center" }}>
            <Button
              style={{ width: 160, height: 60, fontSize: "27px" }}
              component={Link}
              to={props.buttonPath}
              variant="contained"
              size="large"
              color={props.buttonColor}
            >
              {props.buttonText}
            </Button>
          </Box>

      </Container>
    </Section>
  );
}

export default FeaturesSection;
