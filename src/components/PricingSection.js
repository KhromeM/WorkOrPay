import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { Link } from "./../util/router";
import { useAuth } from "./../util/auth";
import { ScatterPlot } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(3),
  },
  price: {
    display: "flex",
    alignItems: "baseline",
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  perkIcon: {
    minWidth: 34,
    color: theme.palette.success.main,
  },
}));

function PricingSection(props) {
  const classes = useStyles();

  const auth = useAuth();

  const items = [
    {
      id: "beginner",
      name: "Tier 1: Pressure",
      price: "9.99",
      perks: [
        //"Daily check-ins via text",
        // "Milestones",
        "Social Media Penalties",
        "Financial Penalties",
        "Goal Verification",
        "One Contract at a time",

        //"Up to 3 Contracts at a time",
        // "Facetime / Phone calls / Zoom check ins",
        "30-day refund policy. No questions asked",
      ],
    },
    {
      id: "starter",
      name: "Tier 2: Propel",
      price: "19.99",
      perks: [
        "Everything from Tier 1",
        "Personalized Support",
        "Daily Human check-ins via text",
        "Three Contracts at a time",
        "30-day refund policy. No questions asked",
      ],
    },
    {
      id: "business",
      name: "Tier 3: Perform",
      price: false,
      perks: [
        "Everything from Tier 2",
        // "Social Media Penalties",
        //"Only offered in select locations",
        "Facetime / Phone calls / Zoom check ins",
        "Customized plan",
        "30-day refund policy. No questions asked",
      ],
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
        <br />
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} md={4} key={index}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Box className={classes.price} mt={1}>
                    {item.price ? (
                      <>
                        <Typography variant="h3">${item.price}</Typography>
                        <Typography variant="h4" color="textSecondary">
                          /mo
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="h4" color="textSecondary">
                        Coming Soon!
                      </Typography>
                    )}
                  </Box>

                  {item.description && (
                    <Box mt={2}>
                      <Typography component="p" color="textSecondary">
                        {item.description}
                      </Typography>
                    </Box>
                  )}

                  {item.perks && (
                    <Box mt={1}>
                      <List aria-label="perks">
                        {item.perks.map((perk, index) => (
                          <ListItem
                            className={classes.listItem}
                            disableGutters={true}
                            key={index}
                          >
                            <ListItemIcon className={classes.perkIcon}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText>{perk}</ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  <Box mt="auto" pt={3}>
                    {item.price ? (
                      <Button
                        component={Link}
                        to={
                          auth.user
                            ? `/purchase/${item.id}`
                            : `/auth/signup?next=/purchase/${item.id}`
                        }
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth={true}
                      >
                        Choose
                      </Button>
                    ) : null}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default PricingSection;
