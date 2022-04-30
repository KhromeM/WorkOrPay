import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./rainbow.css"

const useStyles = makeStyles((theme) => ({
  root: {
    // Add bottom margin if element below
    "&:not(:last-child)": {
      marginBottom: "2rem",
    },
  },
  subtitle: {
    // Subtitle text generally isn't very long
    // so usually looks better to limit width.
    maxWidth: 700,
    fontWeight: 500,
    // So we can have max-width but still
    // have alignment controlled by text-align.
    display: "inline-block",
  },
}));

function SectionHeader(props) {
  const classes = useStyles();

  const { subtitle, title, size, className, contractcolors, rainbow, money, ...otherProps } = props;

  // Render nothing if no title or subtitle
  if (!title && !subtitle) {
    return null;
  }
  // console.log(money, 'money', rainbow, 'rainbow')

  return (
    <Box
      component="header"
      className={classes.root + (props.className ? ` ${props.className}` : "")}
      {...otherProps}
    >
      {title && (
        <Typography
          variant={`h${size}`}
          gutterBottom={props.subtitle ? true : false}
        >
          {title}
        </Typography>
      )}
      {!contractcolors && subtitle && (
        <Typography variant="h5" className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
      {contractcolors && rainbow && subtitle && (
        <Typography variant="h5" className={classes.subtitle}>
          {subtitle == 'Social Contract' ? <div><span className="borderontext" style={{fontSize: '1.25em', color: '#6495ED'}}>Social Contract</span> </div>  : <div className="borderontext" style={{fontSize: '1.25em', color: '#00cc00'}}>{subtitle}</div>}
        </Typography>
      )}
      
    </Box>
  );
}

export default SectionHeader;
