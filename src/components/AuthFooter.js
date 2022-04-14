import React from "react";
import Box from "@material-ui/core/Box";
import LinkMui from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "./../util/router";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  spacerSmall: {
    display: "inline-block",
    width: theme.spacing(1),
  },
  spacerMedium: {
    display: "inline-block",
    width: theme.spacing(2),
  },
}));

function AuthFooter(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.type === "signup" && (
        <>
          {props.showAgreement && (
            <Box mb={2}>
              By signing up, you are agreeing to our{" "}
              <LinkMui component={Link} to={props.termsPath}>
                Terms of Service
              </LinkMui>{" "}
              and{" "}
              <LinkMui component={Link} to={props.privacyPolicyPath}>
                Privacy Policy
              </LinkMui>
              .
            </Box>
          )}

          {props.signinText}
          <span className={classes.spacerSmall} />
          <LinkMui component={Link} to={props.signinPath}>
            {props.signinAction}
          </LinkMui>
        </>
      )}

      {props.type === "signin" && (
        <>
          <LinkMui component={Link} to={props.signupPath}>
            {props.signupAction}
          </LinkMui>

          {props.forgotPassAction && (
            <>
              <span className={classes.spacerMedium} />
              <LinkMui component={Link} to={props.forgotPassPath}>
                {props.forgotPassAction}
              </LinkMui>
            </>
          )}
        </>
      )}

      {props.type === "forgotpass" && (
        <>
          {props.signinText}
          <span className={classes.spacerSmall} />
          <LinkMui component={Link} to={props.signinPath}>
            {props.signinAction}
          </LinkMui>
        </>
      )}
    </div>
  );
}

export default AuthFooter;
