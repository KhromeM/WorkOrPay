import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import { Link } from "./../util/router";
import { useDarkMode } from "./../util/theme";

const useStyles = makeStyles((theme) => ({
  sticky: {
    marginTop: "auto",
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    flex: "none",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
    [theme.breakpoints.up("sm")]: {
      flex: "50%",
    },
  },
  brand: {
    display: "block",
    height: 32,
  },
  social: {
    alignItems: "flex-end",
  },
  link: {
    color: "inherit",
    lineHeight: 1,
    "&:not(:last-of-type)": {
      marginRight: "1.2rem",
    },
  },
  left: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start",
    },
  },
  right: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
  },
  // Move links to end (bottom right)
  // Swaps position with social
  smallLinks: {
    [theme.breakpoints.up("sm")]: {
      order: 1,
    },
  },
  legal: {
    opacity: 0.6,
    fontSize: "0.875rem",
    "& a": {
      color: "inherit",
      marginLeft: "0.8rem",
    },
  },
}));

function Footer(props) {
  const classes = useStyles();

  const darkMode = useDarkMode();
  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && darkMode.value ? props.logoInverted : props.logo;

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={props.sticky && classes.sticky}
    >
      <Container>
        <div className={classes.wrapper}>
          <div className={`${classes.item} ${classes.left}`}>
            <Link to="/">
              <img src={logo} alt="Logo" className={classes.brand} />
            </Link>
          </div>
          <div
            className={`${classes.item} ${classes.right} ${classes.smallLinks}`}
          >
            <Typography>
              {/* <LinkMui component={Link} to="/about" className={classes.link}>
                About
              </LinkMui> */}
              <LinkMui component={Link} to="/faq" className={classes.link}>
                FAQ
              </LinkMui>
              <LinkMui component={Link} to="/contact" className={classes.link}>
                Contact
              </LinkMui>
              <LinkMui
                // href=""
                to="/"
                target="_blank"
                rel="noreferrer"
                className={classes.link}
              >
                Blog
              </LinkMui>
            </Typography>
          </div>
          <div className={`${classes.item} ${classes.right} ${classes.social}`}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <TwitterIcon fontSize="small" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <FacebookIcon fontSize="small" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <InstagramIcon fontSize="small" />
            </a>
          </div>
          <span className={`${classes.item} ${classes.legal} ${classes.left}`}>
            {props.copyright}
            <LinkMui component={Link} to="/legal/terms-of-service">
              Terms
            </LinkMui>
            <LinkMui component={Link} to="/legal/privacy-policy">
              Privacy
            </LinkMui>
          </span>
        </div>
      </Container>
    </Section>
  );
}

export default Footer;
