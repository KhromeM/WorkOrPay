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

  const itemsAreEmpty = !items || items.length === 0;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [creatingItem, setCreatingItem] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Card>
      <Typography variant="h6" paragraph={true}>
        <strong> Your Contract</strong>
      </Typography>

      {(itemsStatus === "loading" || itemsAreEmpty) && (
        <Box py={5} px={3} align="center">
          {itemsStatus === "loading" && <CircularProgress size={32} />}

          {itemsStatus !== "loading" && itemsAreEmpty && (
            <>Nothing yet. Click the button to add your first item.</>
          )}
        </Box>
      )}

      {itemsStatus !== "loading" && items && items.length > 0 && (
        <List disablePadding={true}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              divider={index !== items.length - 1}
              className={item.featured ? classes.featured : ""}
            >
              <ListItemText>{item.name}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="update"
                  onClick={() => setUpdatingItemId(item.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <CardContent className={classes.cardContent}></CardContent>
    </Card>
  );
}
