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
import { Card, CardActions, CardContent } from "@material-ui/core";
import Time from "./Time";
import { Grid } from "@material-ui/core";
import contact from "../../util/contact";
import {updateContract as updateItem} from "../../util/db";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

export default function Contract({contract}) {
  const classes = useStyles();

  const auth = useAuth();
  useEffect(() => {});
  const [pending, setPending] = useState(false);

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

    return month[dMonth] + " " + day.toString() ;
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
        alert("Great Job! We will contact you for verification shortly.");
      })
      .then(()=>{
        updateItem(contract.id,{'verificationRequested': 'true'})
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
      <Card>
        <CardContent className={classes.cardContent}>
          <Box>
            <Typography variant="h6" paragraph={true}>
              <strong> Your Contract:</strong>
            </Typography>
            <Box mt={3}>
                <List disablePadding={true}>
                    <>
                      <Card variant="outlined">
                        {" "}
                        <CardContent>
                          <div>
                            <ListItemText>
                              <h2>Goal: {contract.goal}</h2>
                            </ListItemText>
                          </div>
                          <div>
                            <ListItemText>
                              <h3>
                                By:{" "}
                                {format(
                                  timestampToDeadline(
                                    contract.createdAt,
                                    contract.days
                                  )
                                )}
                              </h3>
                            </ListItemText>
                          </div>
                        </CardContent>
                        {contract.name ==='social' ? 
                        <div>
                        <CardContent>
                          <div>
                            <ListItemText>
                              <h3>
                                <strong>
                                  Social Contract
                                </strong>
                              </h3>
                            </ListItemText>
                          </div>
                        </CardContent>
                        </div>
                        :
                        <div>
                           <CardContent>
                          <div>
                            <ListItemText>
                              <h3>
                                <strong>
                                  Financial Contract
                                </strong>
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
                                  Penalty type:{" "}
                                  <span>
                                    {contract.finPenType}
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
                                  When payment: {" "}
                                  <span>
                                    {contract.contractPayment}
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
                                  Beneficiary:{" "}
                                  <span>
                                    {contract.beneficiary}
                                  </span>{" "}
                                </strong>
                              </h3>
                            </ListItemText>

                        </CardContent>
                      </div> }

                        
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
            
            {!contract.verificationRequested ?
              <Grid
                  style={{ paddingTop: "80px", textAlign: "center" }}
                  item={true}
                  xs={12}
                  md={6}
                >
                  
                  
                      <Button
                        style={{ marginTop: "20px" }}
                        variant="contained"
                        size="medium"
                        color="#00B0FF"
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
                :
                <div>Congratulations! We will verify you have completed the contract
                  and return your deposit if you made one.
                </div>
                }



          </Box>
        </CardContent>
      </Card>{" "}
    </Grid>
  );
}
