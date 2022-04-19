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
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title='How It Works'
          subtitle='Not very complicated...you work or you pay.'
          size={3}
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
              alignItems="center"
              spacing={4}
            >
              <Grid item={true} xs={12} md={6}>
                <Box
                  textAlign={{
                    xs: "center",
                    md: "left",
                  }}
                >
                  <Typography variant="h4" gutterBottom={true}>
                  1) Sign Up
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  First sign up for an account and purchase the monthly membership. Once you have a membership you will be able to form contracts.
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                  2) Form A Contract
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  Concretely define your goal. Make it  measurable. Set a hard deadline. Give yourself enough time to complete your objectives, but not enough time for you to slack off. Example: "I will finish creating and launch my website in 8 days!
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                  3) Set Financial Penalties 
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  If just making goals was enough, you wouldn't be here. Create extra motivation for yourself by wagering your money. Choose an amount from $25-$1000. Choose the charity or anti-charity that gets your money if you fail and deposit the amount.
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                    4) Follow Through
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  Now you have until your deadline to reach your goal. Once you do, send us proof so we can verify it and send your deposit back. If you fail to complete your goal by the deadline, your deposit is donated to the cause you picked prior.
                  </Typography>

                  
                </Box>
              </Grid>
            </Grid>

        </Container>
      </Container>
      <br/> <br/> <br/> <br/>





      <Container>
        <SectionHeader
          title='Is this for me?'
          subtitle='Depends, are you as lazy as us?'
          size={3}
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
              alignItems="center"
              spacing={4}
            >
              <Grid item={true} xs={12} md={6}>
                <Box
                  textAlign={{
                    xs: "center",
                    md: "left",
                  }}
                >
                  <Typography variant="h4" gutterBottom={true}>
                  You are ambitious but lazy
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  You have temporary bursts of motivation where you set out to accomplish challenging tasks. Unfortunately, you lose motivation after a few days and give up. We remove the option of giving up by holding your money hostage.
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                  You procrastinate
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  You always wait until the last minute to start working. It's almost impossible for you to start working on something that isn't due in a couple of days. WorkOrPay allows you to set deadlines as short as three days to eliminate procrastination.
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                  Deadlines make you superhuman
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  Ever notice just how efficient you become once deadlines start approaching? What usually took you a day to do, now takes only an hour. We let you easily create consequential deadlines and so you can go into superhuman mode more often. 
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                  You get distracted
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  You were about to go to the gym, but wait! What this on Reddit?!? There goes that. We have real humans text you to make sure you are staying on track so you don't get sidetracked.
                  </Typography>

                  <Typography variant="h4" gutterBottom={true}>
                    You HATE losing
                  </Typography>
                  <Typography className={classes.description} variant="h6">
                  It's one thing to give up when there are no stakes and no accountability. It's entirely different when giving up means losing a significant amount of your hard earned money. 
                  Worse yet, that money being donated to a cause you HATE. By choosing an anti-charity as the potential beneficiary of your deposit you can generate even more motivation to not quit.
                  Do you really want your money going to [Insert Political Party]'s coffers? No? Then you better get to work.
                  </Typography>

                  
                </Box>
              </Grid>
            </Grid>

        </Container>
      </Container>
    </Section>
  );
}

export default HowItWorks;




