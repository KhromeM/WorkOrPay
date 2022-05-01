import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import EditItemModal from "./EditItemModal";
import { useAuth } from "../../util/auth";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  Chip,
  Snackbar,
  SnackbarContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import GavelIcon from "@material-ui/icons/Gavel";
import InfoIcon from "@material-ui/icons/Info";
import Time from "./Time";
import { Grid } from "@material-ui/core";
import contact from "../../util/contact";
import { updateContract as updateItem } from "../../util/db";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

export default function Contract({ contract, items }) {
  const classes = useStyles();

  const auth = useAuth();
  useEffect(() => {});
  const [pending, setPending] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  function timestampToDeadline(timestamp, days) {
    timestamp = timestamp.seconds;
    days = Number(days);
    let date = new Date(timestamp * 1000);
    date.setDate(date.getDate() + days);
    return date;
  }
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function format(date) {
    let dMonth = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
      hours = "0" + hours.toString();
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }

    return month[dMonth] + " " + day.toString();
  }

  const data = {
    name: auth.user.name,
    email: auth.user.email,
    contract: contract,
    message: `User has completed their contract(s). Verify it.`,
  };

  const onSubmit = () => {
    // Show pending indicator
    setPending(true);

    //hideContacts()

    contact
      .submit(data)
      .then(() => {
        // Clear form
        //reset();
        // Show success alert message
        // alert("Great Job! We will contact you for verification shortly.");
        setSnackbar(true);
      })
      .then(() => {
        updateItem(contract.id, { verificationRequested: "true" });
      })
      .catch((error) => {
        // Show error alert message
        alert(error.message);
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <Grid item={true} xs={12} md={12}>
      <Card style={{ filter: "brightness(0.9)" }}>
        <CardContent className={classes.cardContent}>
          <Box>
            <Typography variant="h6" paragraph={true}>
              <strong> Your Contract:</strong>
            </Typography>
            <Box mt={3}>
              <List disablePadding={true}>
                <>
                  <Card
                    variant="outlined"
                    style={{ textAlign: "center", padding: "2vw" }}
                  >
                    {" "}
                    <CardContent>
                      <div>
                        <ListItemText>
                          <h2>
                            <Chip
                              style={{ marginBottom: "5px" }}
                              icon={<GavelIcon />}
                              label="Goal"
                            />
                            <br />
                            {contract.goal}
                          </h2>
                        </ListItemText>
                      </div>
                      <div>
                        <ListItemText>
                          <h3>
                            <Chip
                              style={{ marginBottom: "5px" }}
                              icon={<AccessAlarmsIcon />}
                              label="Due Date"
                            />{" "}
                            <br />
                            {format(
                              timestampToDeadline(
                                contract.createdAt,
                                contract.days
                              )
                            )}
                          </h3>
                        </ListItemText>
                      </div>
                    </CardContent>{" "}
                    {/* new table */}
                    <Accordion style={{ filter: "brightness(0.94)" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          <strong>
                            {contract.name.charAt(0).toUpperCase() +
                              contract.name.slice(1) +
                              " Contract Details "}
                          </strong>
                          {"  "}
                          <span style={{ fontSize: "0.80em" }}>
                            (Click to Expand)
                          </span>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {contract.name === "social" ? (
                          <TableContainer component={Paper}>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableBody>
                                <TableRow key={data.name}>
                                  <TableCell
                                    style={{
                                      display: "flex",
                                      justifyContent: "baseline",
                                    }}
                                    component="th"
                                    scope="row"
                                  >
                                    <div
                                      style={{
                                        paddingTop: "2px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      <strong> Platform </strong>
                                    </div>
                                    <Tooltip
                                      style={{ marginBottom: "2px" }}
                                      title={
                                        <>
                                          This is the platform that we will post
                                          to regarding your goal if you don't
                                          achieve it.
                                          <br />
                                          <br />
                                          If you achieve your goal, you can
                                          allow us to make a post that you
                                          succeeded or you can opt-out.
                                        </>
                                      }
                                      placement="right"
                                    >
                                      <InfoIcon>
                                        <DeleteIcon />
                                      </InfoIcon>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell align="right">
                                    {contract.social_platform === "fb"
                                      ? "Facebook"
                                      : "Text Message"}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        ) : (
                          <TableContainer component={Paper}>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              {/* <TableHead>
                                <TableRow>
                                  <TableCell>Dessert (100g serving)</TableCell>
                                  <TableCell align="right">Calories</TableCell>
                                </TableRow>
                              </TableHead> */}
                              <TableBody>
                                <TableRow key={data.name}>
                                  <TableCell component="th" scope="row">
                                    <strong> Maximum Possible Penalty: </strong>
                                  </TableCell>
                                  <TableCell align="center">
                                    <span style={{ color: "#FF0000" }}>
                                      ${contract.dollars}
                                    </span>{" "}
                                  </TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                  <TableCell component="th" scope="row">
                                    <strong>
                                      {" "}
                                      Penalties Incurred So Far:{" "}
                                    </strong>
                                  </TableCell>
                                  <TableCell align="center">
                                    <span style={{ color: "#FF0000" }}>
                                      ${contract.penalty ? contract.penalty : 0}
                                    </span>{" "}
                                  </TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                  <TableCell
                                    style={{
                                      display: "flex",
                                      justifyContent: "baseline",
                                    }}
                                    component="th"
                                    scope="row"
                                  >
                                    <div
                                      style={{
                                        paddingTop: "2px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      <strong> Penalty Type </strong>
                                    </div>
                                    <Tooltip
                                      style={{ marginBottom: "2px" }}
                                      title={
                                        <>
                                          <u>
                                            <b>Progressive</b>
                                          </u>
                                          : Partial charge for missed goals{" "}
                                          <br />{" "}
                                          <u>
                                            <b>Static</b>
                                          </u>
                                          : Full charge upon any part of the
                                          goal failed
                                        </>
                                      }
                                      placement="right"
                                    >
                                      <InfoIcon>
                                        <DeleteIcon />
                                      </InfoIcon>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell align="center">
                                    {contract.finPenType
                                      .charAt(0)
                                      .toUpperCase() +
                                      contract.finPenType.slice(1)}
                                  </TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                  <TableCell
                                    style={{
                                      display: "flex",
                                      justifyContent: "baseline",
                                    }}
                                    component="th"
                                    scope="row"
                                  >
                                    <div
                                      style={{
                                        paddingTop: "2px",
                                        marginRight: "5px",
                                      }}
                                    >
                                      <strong> When Payment </strong>
                                    </div>
                                    <Tooltip
                                      style={{ marginBottom: "2px" }}
                                      placement="right"
                                      title={
                                        <>
                                          <u>
                                            <b>Deferred</b>
                                          </u>
                                          : We will charge your card on file if
                                          you fail your goal. <br />{" "}
                                          <u>
                                            <b>Charged</b>
                                          </u>
                                          : You already deposited the money!
                                        </>
                                      }
                                    >
                                      <InfoIcon>
                                        <DeleteIcon />
                                      </InfoIcon>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell align="center">
                                    {contract.contractPayment
                                      .charAt(0)
                                      .toUpperCase() +
                                      contract.contractPayment.slice(1)}
                                  </TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                  <TableCell component="th" scope="row">
                                    <strong> Beneficiary: </strong>
                                  </TableCell>
                                  <TableCell align="center">
                                    {contract.beneficiary}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </AccordionDetails>
                    </Accordion>
                    {/* social
                    {contract.name === "social" ? (
                      <div>
                        <CardContent>
                          <div>
                            <ListItemText>
                              <h3>
                                <strong>Social Contract</strong>
                              </h3>
                            </ListItemText>
                          </div>
                        </CardContent>

                        <CardContent>
                          <div>
                            <ListItemText>
                              <h3>
                                <strong>
                                  Platform:{" "}
                                  {contract.social_platform === "fb"
                                    ? "Facebook"
                                    : "Text Message"}
                                </strong>
                              </h3>
                            </ListItemText>
                          </div>
                        </CardContent>
                      </div>
                    ) : (
                      <div>
                        <CardContent>
                          <div>
                            <ListItemText>
                              <h3>
                                <strong>Financial Contract</strong>
                              </h3>
                            </ListItemText>
                          </div>
                        </CardContent>
                        <CardContent>
                          <div>
                            <ListItemText>
                              <h3>
                                <strong>
                                  {" "}
                                  Maximum Possible Penalty:{" "}
                                  <span style={{ color: "#FF0000" }}>
                                    ${contract.dollars}
                                  </span>{" "}
                                </strong>
                              </h3>
                            </ListItemText>
                          </div>
                        </CardContent>
                        <CardContent>
                          <ListItemText>
                            <h3>
                              <strong>
                                {" "}
                                Penalties Incurred So Far:{" "}
                                <span style={{ color: "#FF0000" }}>
                                  ${contract.penalty ? contract.penalty : 0}
                                </span>{" "}
                              </strong>
                            </h3>
                          </ListItemText>
                        </CardContent>

                        <CardContent>
                          <ListItemText>
                            <h3>
                              <strong>
                                {" "}
                                Penalty Type:{" "}
                                <span>
                                  {contract.finPenType.charAt(0).toUpperCase() +
                                    contract.finPenType.slice(1)}
                                </span>{" "}
                              </strong>
                            </h3>
                          </ListItemText>
                        </CardContent>

                        <CardContent>
                          <ListItemText>
                            <h3>
                              <strong>
                                {" "}
                                When Payment:{" "}
                                <span>
                                  {" "}
                                  {contract.contractPayment
                                    .charAt(0)
                                    .toUpperCase() +
                                    contract.contractPayment.slice(1)}
                                </span>{" "}
                              </strong>
                            </h3>
                          </ListItemText>
                        </CardContent>

                        <CardContent>
                          <ListItemText>
                            <h3>
                              <strong>
                                {" "}
                                Beneficiary: <span>
                                  {contract.beneficiary}
                                </span>{" "}
                              </strong>
                            </h3>
                          </ListItemText>
                        </CardContent>
                      </div>
                    )} */}
                    <CardContent>
                      <ListItemText>
                        <h4>
                          <strong>Time left: </strong>

                          <Time
                            deadline={timestampToDeadline(
                              contract.createdAt,
                              contract.days
                            )}
                          />
                        </h4>
                      </ListItemText>
                    </CardContent>
                  </Card>
                </>
              </List>
            </Box>
            <Snackbar
              style={{ color: "green" }}
              open={snackbar}
              autoHideDuration={5000}
              onClose={() => {
                setSnackbar(false);
              }}
              // message="🎉 Great Job! We will contact you for verification shortly. 🎉"
              // action={action}
            >
              <SnackbarContent
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
                message={
                  <span id="client-snackbar">
                    🎉 Great Job! We will contact you for verification shortly.
                    🎉
                  </span>
                }
              />
            </Snackbar>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {!contract.verificationRequested ? (
                <Grid
                  style={{ paddingTop: "12px", textAlign: "center" }}
                  item={true}
                  xs={12}
                  md={6}
                >
                  <Button
                    style={{ marginTop: "20px", marginBottom: "17px" }}
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={onSubmit}
                  >
                    {pending ? (
                      <CircularProgress color="success" />
                    ) : (
                      <div>
                        <strong>Submit for verification</strong>
                      </div>
                    )}
                  </Button>
                </Grid>
              ) : (
                <div style={{ marginTop: "26px", textAlign: "center" }}>
                  <b>Congratulations for completing your goal!</b>
                  <br /> We will soon verify that you have completed the
                  contract and return your deposit if you made one.
                </div>
              )}
            </div>
          </Box>
        </CardContent>
      </Card>{" "}
    </Grid>
  );
}
