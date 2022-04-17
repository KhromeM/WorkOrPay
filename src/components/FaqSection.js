import React from "react";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { Box, Button } from "@material-ui/core";
import { Link } from "./../util/router";

const useStyles = makeStyles((theme) => ({
  accordion: {
    // Remove shadow
    boxShadow: "none",
    "&:before": {
      // Remove default divider
      display: "none",
    },
    // Add a custom border
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  expanded: {
    margin: `0 !important`,
  },
  summary: {
    minHeight: 78,
  },
  summaryContent: {
    margin: "0 !important",
  },
}));

function FaqSection(props) {
  const classes = useStyles();

  const items = [
    {
      question: "What are the contracts?",
      disclaimer: false,
      answer:
        "Contracts are monthly agreements you form with us that outline the specifics of your goals and how we are going to hold you accountable, as well as the penalties that you will face if you do not reach your goal. The contract discusses our method of verification, so we can confirm you really did hit your target- as well as the penalties you want us to enforce if you fail to meet your minimum targets.",
    },
    {
      question: "What are financial penalties?",
      disclaimer: true,
      answer:
        "If you really want extra motivation, you can agree to a financial penalty in your contract. A financial penalty requires you make a deposit at the begining of the month. We hold the money as the middleman temporarily until the end date specified in the contract. If you meet your targets and achieve your goal, you get the money back! However, if you fail to do so, we will send the money to charities or even causes you hate (anti-charities), to further motivate you to not fail.",
      answer2:
        "NOTE: Because of transaction processing fees, we DEDUCT 3% from deposits before sending them back to you or sending them elsewhere. EXAMPLE: If you deposit $100, then fulfill your goals, you will get $97 back. This is 100% not up to us and is the result of our payment processor Stripe who charges a fee for every transaction.",
    },
    {
      question: "What are social media penalties?",
      disclaimer: true,
      answer:
        "You can agree to social media penalties in your contract for extra motivation. Choose which social media platform(s) to potentially receive the penalty and the type of penalty. Social media penalties include but are not limited to: Our team tagging you on a post detailing which goals you failed to meet. We can post an embarassing picture of you (would require you to give us access to the picture when forming the contract). We can tag your friends on a facebook post to let them know you failed your goal.",
      answer2:
        "We want to simply nudge you towards hitting your goals with social pressure. If there's anything you are extremely uncomfortable with regarding social media posts that would cause immense mental anguish for you, there is no need to go with this option. Having respect and integrity for you as a human being is the foremost objective- so please make sure you pick a penalty that you'd be uncomfortable with but only to the extent of helping you hit your goals.",
    },
    {
      question: "How are my claims verified?",
      disclaimer: false,
      answer:
        "We perform weekly verfications to make sure you genuinely met your goal. The exact verification method depends on what your goal is. For example, if your goal is to lose weight, then the verification method may be you sending us a small video clip of getting on the scale and showing the result. The goal of verification is not to get incontrovertible proof of your actions, rather it is a measure to increase your accountability. You can fool us, and we will always give you the benefit of doubt. We trust that you will be repulsed by the idea of putting in effort to forge a proof of something that you willingly signed yourself up to do, and thus have an incentive honest with us.",
    },
    {
      question: "What if I want a refund?",
      disclaimer: false,
      answer:
        "We are certain that you will LOVE our service. However, if our service is unable to provide you with worthwhile value, just send us a message and we will refund you for the whole month. No questions asked. We will make sure that you love our service though!",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="md">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />

        {items.map((item, index) => (
          <Accordion
            classes={{
              root: classes.accordion,
              expanded: classes.expanded,
            }}
            key={index}
          >
            <AccordionSummary
              classes={{
                root: classes.summary,
                content: classes.summaryContent,
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-panel-${index}`}
            >
              <Typography variant="h6">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails id={`faq-panel-${index}`}>
              <div>
                <Typography>{item.answer}</Typography>
                <br />
                <br />
                {item.disclaimer && (
                  <Typography sx={{ fontWeight: 700 }}>
                    {item.answer2}
                  </Typography>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box textAlign="center">
          <Button
            style={{
              width: 182,
              height: 50,
              fontSize: "21px",
              marginTop: "25px",
            }}
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            color="primary"
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Section>
  );
}

export default FaqSection;
