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

export default function ForMe() {
    const classes = useStyles()
  return (
    <div>
               <Container>
          <SectionHeader
            title="Is this for me?"
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
              alignItems="center"
              justifyContent="center"
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
                      You are ambitious but lazy
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      You have temporary bursts of motivation where you set out
                      to accomplish challenging tasks. Unfortunately, you lose
                      motivation after a few days and give up. We remove the
                      option of giving up without consequences.
                    </Typography>
                  </Box>

                  <Box style={{ marginBottom: "60px" }}>
                    <Typography variant="h4" gutterBottom={true}>
                      You procrastinate
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      You always wait until the last minute to start working.
                      It's almost impossible for you to start working on
                      something that isn't due in a couple of days. WorkOrPay
                      allows you to set deadlines as short as a day to
                      eliminate procrastination.
                    </Typography>
                  </Box>
                  <Box style={{ marginBottom: "60px" }}>
                    <Typography variant="h4" gutterBottom={true}>
                      Deadlines make you superhuman
                    </Typography>
                    <Typography className={classes.description} variant="h6">
                      Ever notice just how efficient you become once deadlines
                      start approaching? What usually took you a day to do, now
                      takes only an hour. Create consequential
                      deadlines so you can go into superhuman mode more
                      often.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Container>
    </div>
  )
}
