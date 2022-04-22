import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDarkMode } from "../util/theme";
import { makeStyles, useTheme } from "@material-ui/core";
import { getThemeProps } from "@material-ui/styles";

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
export default function SimpleAccordion({ title, text, secondtext, auth }) {
  const classes = useStyles();
  const theme = useTheme();
  // console.log(theme);
  const [expanded, setExpanded] = React.useState(
    auth.user.planIsActive ? false : "panel1"
  );
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{
          backgroundColor: theme.palette.type === "dark" ? "gray" : "#fffbf0",
        }}
        // theme={theme.palette.type}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`faq-panel-${1}`}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails id={`faq-panel-${1}`}>
          <Typography>
            <strong>{text}</strong>
          </Typography>
          <br />
          <Typography>{secondtext}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
