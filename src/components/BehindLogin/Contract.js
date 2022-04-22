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
import { Card, CardContent } from "@material-ui/core";
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
                      if (item.type === "contract")
                        return (
                          <>
                            <div>
                              <ListItemText>Goal: {item.goal}</ListItemText>
                            </div>
                            <div>
                              <ListItemText>
                                By:{" "}
                                {timestampToDeadline(
                                  item.createdAt,
                                  item.days
                                ).toString()}
                              </ListItemText>
                            </div>
                            <br /> <br />
                            <div>
                              <ListItemText>
                                Time left:{" "}
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
