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
import { updateItem, deleteItem, useItemsByOwner } from "../../util/db";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Time from "./Time";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

export default function Contract() {
  const classes = useStyles();

  const auth = useAuth();
  useEffect(() => {});
  const {
    data: items,
    status: itemsStatus,
    error: itemsError,
  } = useItemsByOwner(auth.user.uid);

  let hasContract = false;
  items &&
    items.forEach((item) => {
      if (item.type === "contract") hasContract = true;
    });

  const itemsAreEmpty = !items || items.length === 0 || !hasContract;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [creatingItem, setCreatingItem] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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

    return month[dMonth] + " " + day.toString() + " " + hours + ":" + minutes;
  }

  return (
    <Grid item={true} xs={12} md={12}>
      <Card>
        <CardContent className={classes.cardContent}>
          <Box>
            <Typography variant="h6" paragraph={true}>
              <strong> Your Contract:</strong>
            </Typography>

            {(itemsStatus === "loading" || itemsAreEmpty) && (
              <Box py={5} px={3} align="center">
                {itemsStatus === "loading" && <CircularProgress size={32} />}

                {itemsStatus !== "loading" && itemsAreEmpty && (
                  <>No contract found. Please create a contract.</>
                )}
              </Box>
            )}
            {hasContract && auth.user.stripeContractPaidOrNot !== "paid" && (
              <>No contract found. Please create a contract.</>
            )}
            <Box mt={3}>
              {itemsStatus !== "loading" && items && items.length > 0 && (
                <List disablePadding={true}>
                  {auth.user.stripeContractPaidOrNot === "paid" &&
                    items.map((item, index) => {
                      if (item.type === "contract") {
                        return (
                          <>
                            <Card variant="outlined">
                              {" "}
                              <CardContent>
                                <div>
                                  <ListItemText>
                                    <h2>Goal: {item.goal}</h2>
                                  </ListItemText>
                                </div>
                                <div>
                                  <ListItemText>
                                    <h3>
                                      By:{" "}
                                      {format(
                                        timestampToDeadline(
                                          item.createdAt,
                                          item.days
                                        )
                                      )}
                                    </h3>
                                  </ListItemText>
                                </div>
                              </CardContent>
                              <CardContent>
                                <div>
                                  <ListItemText>
                                    <h4>
                                      <strong>
                                        {" "}
                                        Penalty if you fail:{" "}
                                        <span style={{ color: "#FF0000" }}>
                                          ${item.dollars}
                                        </span>{" "}
                                      </strong>
                                    </h4>
                                  </ListItemText>
                                </div>
                              </CardContent>
                            </Card>
                            <div>
                              <ListItemText>
                                <h4>
                                  <strong>Time left: </strong>
                                </h4>
                                <Time
                                  deadline={timestampToDeadline(
                                    item.createdAt,
                                    item.days
                                  )}
                                />{" "}
                              </ListItemText>
                            </div>
                          </>
                        );
                      }
                    })}
                </List>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>{" "}
    </Grid>
  );
}
