import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import { useAuth } from "./../util/auth";
import { useHistory, useRouter } from "../util/router";

function SettingsGeneral(props) {
  const auth = useAuth();
  const history = useHistory();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);
    console.log(data, "data");

    return auth
      .updateProfile(data)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: router.query.signedup
            ? "Your profile has been updated! Redirecting you to the dashboard now..."
            : "Your profile has been updated",
        });

        fetch(
          "https://v1.nocodeapi.com/envariable/google_sheets/APwvLTMxEYrgRXpf?tabId=Sheet1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              [new Date().toLocaleString(), data.name, data.email],
            ]),
          }
        ).then((r) => r.json());
        setTimeout(() => {
          if (router.query.signedup) history.push("/dashboard");
        }, 1500);
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit(data),
          });
        } else {
          // Set error status
          props.onStatus({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
            defaultValue={auth.user.name}
            error={errors.name ? true : false}
            helperText={errors.name && errors.name.message}
            fullWidth={true}
            inputRef={register({
              required: "Please enter your name",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            name="email"
            placeholder="user@example.com"
            defaultValue={auth.user.email}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
            fullWidth={true}
            inputRef={register({
              required: "Please enter your email",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={pending}
            fullWidth={true}
          >
            {!pending && <span>Save</span>}

            {pending && <CircularProgress size={28} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SettingsGeneral;
