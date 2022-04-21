import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
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
import { map } from "@firebase/util";

const useStyles = makeStyles((theme) => ({
  paperItems: {
    minHeight: "300px",
    paddingBottom: "10px",
  },
  featured: {
    backgroundColor:
      theme.palette.type === "dark" ? theme.palette.action.selected : "#fdf8c2",
  },
}));

function Milestones(props) {
  const classes = useStyles();

  const auth = useAuth();
  const {
    data: items,
    status: itemsStatus,
    error: itemsError,
  } = useItemsByOwner(auth.user.uid);

  const [creatingItem, setCreatingItem] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState(null);

  const itemsAreEmpty = !items || items.length === 0;

  let earliest = 100000000000000
  let Eid
  items && items.map((item)=> {
    if (Date.parse(item.date) < earliest) {
      earliest = Date.parse(item.date)
      Eid = item
    }
  })

  return (
    <>
      {itemsError && (
        <Box mb={3}>
          <Alert severity="error">{itemsError.message}</Alert>
        </Box>
      )}

      <Paper className={classes.paperItems}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h5">Add Milestones</Typography>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => setCreatingItem(true)}
          >
            Add
          </Button>
        </Box>
        <Divider />

        {itemsStatus !== "loading" && items && items.length > 0 && (
          <List disablePadding={true}>
            {items.map((item, index) => {
              if (item.type === "milestone")
                return (
                  <ListItem
                    key={index} 
                    divider={index !== items.length - 1}
                    className={item.featured ? classes.featured : ""}
                  >
                    <div style={{marginBottom: '14px'}} >
                    <ListItemText style={{marginBottom: '8px'}}><strong> Reach Milestone: </strong>{item.milestones}</ListItemText>
                    <ListItemText><strong>By: {item.date} </strong></ListItemText>
                    </div>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="Update"
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

                );
            })}
            <Box
              sx={{
                fontSize: "1.75em",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Upcoming milestone: <strong>{Eid.milestones} by {Eid.date}</strong>
            </Box>
          </List>
        )}
      </Paper>

      {creatingItem && <EditItemModal onDone={() => setCreatingItem(false)} />}

      {updatingItemId && (
        <EditItemModal
          id={updatingItemId}
          onDone={() => setUpdatingItemId(null)}
        />
      )}
    </>
  );
}

export default Milestones;