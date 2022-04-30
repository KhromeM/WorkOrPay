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
      question: "Who is this for?",
      disclaimer: false,
      answer:
        "Some people have their lives in order. They stick to a schedule, exercise regularly, maybe even do a bit of meditation and yoga. This site is not for them. It's for ambitious people who want to do great things. Who know they have the ability, but struggle to act once their initial burst of motivation disappears. Using this service, they can fuel themselves with external motivation. Until the next burst of internal motivation kicks in.",
    },

    // {
    //   question: "Why does this work?",
    //   disclaimer: true,
    //   answer2:
    //     "Loss aversion: Humans hate losing what they have and will go far out of their way to preserve their current holdings. This is a scientific fact. ",
    //   answer: "Deadlines: Societal programming has engrained in our minds, the importance of not missing deadlines no matter what. Think of how many procrastinators become super efficient workers in the last minute.",
    // },

    {
      question: "What are the contracts?",
      disclaimer: false,
      answer:
        "Contracts are agreements you form that outline the specifics of your goal, the deadline to meet it, and the amount of money you lose if you fail. You also pick the potential recipient of your money in your contract.",
    },
    {
      question: "What are financial penalties?",
      disclaimer: true,
      answer:
        "A financial penalty lets you put your money where your mouth is. Choose a maximum penalty from $25-$1000. If you achieve your goal before the deadline, you do not lose any money. However, if you fail to do so, we will charge you a penalty and send the money to the charity you picked in your contract.",
      answer2:
        "We do not profit from you failing. All the money it is donated to the cause you picked.",
    },
    // {
    //   question: "Why can't you deduct financial penalties only after I fail?",
    //   disclaimer: false,
    //   answer:
    //     "The short answer is that users are simply not motivated if they do not see the money leave their account. We have tested charging before and charging after. The difference in attitudes of the group who still had their money in their accounts compared to the group who were charged in the beginning was staggering. This is a service for people who are serious and ready to make major commitments to reach their goals. ",
    // },
    // {
    //   question: "Are we going to run off with your money?",
    //   disclaimer: true,
    //   answer:
    //     "Fair question. It is pointless to say we find that idea reprehensible. Instead, we will show why it is not in our financial interest: ",
    //   answer2:
    //     "The creators of this website, Khurram Mustafa and William Chan, are young professionals at the beginning of their careers. Their LinkedIn profiles can be seen in the About Us section. It would be extremely shortsighted of us to ruin our reputations trying to make off with your money. It would cost us far more in the long run than whatever sum we managed to take and not lose to chargebacks and lawsuits.",
    // },
    {
      question: "What are social penalties?",
      disclaimer: false,
      answer:
        "Social penalties let you make a public commitment on social media. After you either succeed or fail, the result is posted for your friends or family to see.",
    },
    {
      question: "How are daily check-ups done?",
      disclaimer: false,
      answer:
        "We have real humans message you via text every day after you make a contract. Choose to have us contact you daily, every 3 days, or weekly. If you do not want this, you can turn it off by responding to the texts.",
    },

    // {
    //   question: "What are social media penalties?",
    //   disclaimer: true,
    //   answer:
    //     "You can agree to social media penalties in your contract for extra motivation. Choose which social media platform(s) to potentially receive the penalty and the type of penalty. Social media penalties include but are not limited to: Our team tagging you on a post detailing which goals you failed to meet. We can post an embarassing picture of you (would require you to give us access to the picture when forming the contract). We can tag your friends on a facebook post to let them know you failed your goal.",
    //   answer2:
    //     "We want to simply nudge you towards hitting your goals with social pressure. If there's anything you are extremely uncomfortable with regarding social media posts that would cause immense mental anguish for you, there is no need to go with this option. Having respect and integrity for you as a human being is the foremost objective- so please make sure you pick a penalty that you'd be uncomfortable with but only to the extent of helping you hit your goals.",
    // },
    {
      question: "How are my claims verified?",
      disclaimer: false,
      answer:
        "We perform verifications to make sure you genuinely met your goal. The exact verification method depends on what your goal is. For example, if your goal is to lose weight, then the verification method might be you sending us a small video clip of getting on the scale and showing the result. The goal of verification is not to get incontrovertible proof of your actions, rather it is a measure to increase your accountability. Of course, if you put in the effort to forge plausible proof, you can fool us. But we trust you will be repulsed by the idea of putting in work to forge proof of something that you willingly signed yourself up to do.",
    },

    {
      question: "What if I want a refund?",
      disclaimer: false,
      answer:
        "We are certain that you will love our service. However, if we are unable to provide you with worthwhile value, just send us a message and we will refund you for the whole month. No questions asked. We will make sure that you love our service though!",
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
              {item.disclaimer && (
                    <Typography>
                      <strong>{item.answer2}</strong>
                    </Typography>
                )}
                <br/>
                <Typography>{item.answer}</Typography>
                
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
