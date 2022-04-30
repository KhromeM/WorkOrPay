import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
    textAlign: "center",
  },
}));

function HowItWorks(props) {
  const classes = useStyles();

  return (
    <div id="howitworks">
      <Section
        bgColor={props.bgColor}
        size={props.size}
        bgImage={props.bgImage}
        bgImageOpacity={props.bgImageOpacity}
      >
        <Container>
          <SectionHeader
            title="How It Works"
            size={2}
            textAlign="center"
          />
          <Container
            maxWidth="md"
            disableGutters={true}
            className={classes.itemsContainer}
          >
            <Grid
              className={classes.row}
              container={true}
              item={true}
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item={true} xs={12} md={10}>
                <Box
                  textAlign={{
                    xs: "center",
                    md: "center",
                  }}
                >
                  <Box style={{ marginTop: "30px", marginBottom: "60px" }}>
                    <Typography variant="h4" gutterBottom={true}>
                      1) Sign Up
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      First, sign up for an account and purchase a monthly
                      membership. Once you have a membership you will be able to
                      form contracts.
                    </Typography>
                  </Box>
                  <Box style={{ marginBottom: "60px" }}>
                    <Typography variant="h4" gutterBottom={true}>
                      2) Form A Contract
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      Concretely define your goal. Make it measurable. Set a
                      hard deadline. Give yourself enough time to complete your
                      objectives, but not enough time for you to slack off.
                      Example: "I will finish creating and launch my website in
                      8 days!"
                    </Typography>
                  </Box>
                  <Box style={{ marginBottom: "60px" }}>
                    <Typography variant="h4" gutterBottom={true}>
                      3) Set Penalties
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      If just making goals was enough, you wouldn't be here.
                      Create extra motivation for yourself by wagering your
                      money or reputation. 
                      <br/> <br/>
                      <strong>Financial Contracts: </strong>
                      Choose an amount from $25-$1000 to set as your maximum penalty. 
                      Then pick the charity
                      or anti-charity that gets your money if you fail.

                      <br/> <br/>
                      <strong>Social Contracts: </strong>
                      Send us a link to your social media and add us. If you don't reach your goal, we will make a post about your failure 
                      and tag you so your friends and family can see.
                    </Typography>
                  </Box>
                  <Box style={{ marginBottom: "60px" }}>
                    <Typography variant="h4" gutterBottom={true}>
                      4) Follow Through
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      Now you have until your deadline to reach your goal. Once
                      you do, send us the proof so we can verify it. If you fail to complete your goal by the
                      deadline, you suffer the penalty.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
        <br /> <br /> <br /> <br />
      </Section>
    </div>
  );
}

export default HowItWorks;
