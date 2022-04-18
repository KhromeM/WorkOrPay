import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm } from "react-hook-form";
import contact from "../../util/contact";
import { useAuth } from "../../util/auth";
import {
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import { createItem } from "../../util/db";

function Contact(props) {
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [penalty, setPenalty] = useState("");
  const [dollars, setDollars] = useState(0);
  const { handleSubmit, register, errors, reset } = useForm();

  const auth = useAuth();
  // console.log(auth.user.displayName);

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);
    console.log(data);
    // data.minutes = minutes.toString();
    // data.hours = hours.toString();
    data.penalty = penalty;
    data.type = "contract";
    data.name = "hi";
    console.log(data);

    contact
      .submit(data)
      .then(() => {
        createItem({ owner: auth.user.uid, ...data });
        // Clear form
        reset();
        // Show success alert message
        setFormAlert({
          type: "success",
          message:
            "Your contract has been created! Get ready to achieve your goals!",
        });
      })
      .catch((error) => {
        // Show error alert message
        setFormAlert({
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };
  if (formAlert)
    return (
      <Box
        mb={3}
        sx={{
          marginTop: "40vh",
          marginBottom: "60vh",
          marginLeft: "20vw",
          marginRight: "20vw",
        }}
      >
        <Alert severity={formAlert.type}>{formAlert.message}</Alert>
      </Box>
    );

  return (
    <>
      {/* // this container is max width medium is good */}
      <Container maxWidth="md" style={{ paddingTop: "30px" }}>
        <SectionHeader
          title="Generate your contract"
          subtitle="Contract stuff"
          size={4}
          textAlign="center"
        />
        {formAlert && (
          <Box mb={3}>
            <Alert severity={formAlert.type}>{formAlert.message}</Alert>
          </Box>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid justifyContent="center" container={true} spacing={2}>
            {true && (
              <Grid item={true} xs={12} md={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Name"
                  name="displayName"
                  error={errors.displayName ? true : false}
                  helperText={errors.displayName && errors.displayName.message}
                  fullWidth={true}
                  inputRef={register({
                    required: "Please enter your name",
                  })}
                  value={auth.user ? auth.user.displayName : ""}
                />
              </Grid>
            )}
            <Grid item={true} xs={12} md={true ? 6 : 12}>
              <TextField
                variant="outlined"
                type="email"
                label="Email"
                name="email"
                error={errors.email ? true : false}
                helperText={errors.email && errors.email.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter your email",
                })}
                value={auth.user ? auth.user.email : ""}
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                variant="outlined"
                type="text"
                label="Message"
                name="message"
                multiline={true}
                rows={5}
                error={errors.message ? true : false}
                helperText={errors.message && errors.message.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter a message",
                })}
              />
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <Grid item={true} xs={12}>
              <TextField
                variant="outlined"
                type="text"
                label="Goal"
                name="goal"
                multiline={true}
                rows={3}
                error={errors.goal ? true : false}
                helperText={errors.goal && errors.goal.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter your goal",
                })}
              />
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <Grid item={true} xs={8} md={2}>
              <InputLabel name id="dollars">
                Financial Penalty
              </InputLabel>
              <TextField
                // value={minutes}
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true, style: { fontSize: 50 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  style: { fontSize: 30 },
                }}
                type="text"
                name="dollars"
                // label="Daily Minutes"
                error={errors?.dailyminutes ? true : false}
                helperText={errors?.dailyminutes && errors.dailyminutes.message}
                // onChange={(e) => setMinutes(e.target.value)}
                inputRef={register({
                  required: "Please enter your goal",
                })}
              >
                <option disabled value="">
                  Select an option{" "}
                </option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option selected value={100}>
                  100
                </option>
                <option value={150}>150</option>
                <option value={250}>250</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </TextField>
            </Grid>
            <Grid item={true} xs={12}></Grid>
            {/* save below
            <Grid item={true} xs={8} md={4}>
               <InputLabel name id="dailyminutes">Daily Minutes</InputLabel> 
              <TextField
                // value={minutes}
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                type="text"
                name="dailyminutes"
                label="Daily Minutes"
                error={errors?.dailyminutes ? true : false}
                helperText={errors?.dailyminutes && errors.dailyminutes.message}
                // onChange={(e) => setMinutes(e.target.value)}
                inputRef={register({
                  required: "Please enter your goal",
                })}
              >
                <option disabled value="">
                  Select an option{" "}
                </option>
                <option value={10}>10 Minutes</option>
                <option value={20}>20 Minutes</option>
                <MenuItem value={30}>30 Minutes</MenuItem>
                <MenuItem value={40}>40 Minutes</MenuItem>
                <MenuItem value={50}>50 Minutes</MenuItem>
                <MenuItem value={60}>60 Minutes</MenuItem>
                <MenuItem value={70}>70 Minutes</MenuItem>
                <MenuItem value={80}>80 Minutes</MenuItem>
                <MenuItem value={90}>90 Minutes</MenuItem>
              </TextField>
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <Grid item={true} xs={8} md={4}>
               <InputLabel name id="dailyminutes">Daily Minutes</InputLabel> 
              <TextField
                // value={minutes}
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                type="text"
                name="monthlyhours"
                label="Monthly Hours"
                error={errors?.dailyminutes ? true : false}
                helperText={errors?.dailyminutes && errors.dailyminutes.message}
                // onChange={(e) => setMinutes(e.target.value)}
                inputRef={register({
                  required: "Please enter your goal",
                })}
              >
                <option disabled value="">
                  Select an option{" "}
                </option>
                <option value={10}>10 Minutes</option>
                <option value={20}>20 Minutes</option>
                <MenuItem value={30}>30 Minutes</MenuItem>
                <MenuItem value={40}>40 Minutes</MenuItem>
                <MenuItem value={50}>50 Minutes</MenuItem>
                <MenuItem value={60}>60 Minutes</MenuItem>
                <MenuItem value={70}>70 Minutes</MenuItem>
                <MenuItem value={80}>80 Minutes</MenuItem>
                <MenuItem value={90}>90 Minutes</MenuItem>
              </TextField>
            </Grid> 
            */}

            {/* save above */}
            {/* 
            <Grid item={true} xs={8} md={4}>
              <FormControl size="small" variant="filled" fullWidth>
                <InputLabel id="monthlyhours">Total Monthly Hours</InputLabel>
                <Select
                  required
                  // value={hours}
                  type="text"
                  name="monthlyhours"
                  label="monthlyhours"
                  // onChange={(e) => setHours(e.target.value)}
                >
                  <MenuItem value={10}>10 Hours</MenuItem>
                  <MenuItem value={20}>20 Hours</MenuItem>
                  <MenuItem value={30}>30 Hours</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item={true} xs={8} md={4}>
              <FormControl size="small" variant="filled" fullWidth>
                <InputLabel id="hours">Type of Penalty</InputLabel>
                <Select
                  required
                  // value={penalty}
                  type="text"
                  name="penalty"
                  label="penalty"
                  // onChange={(e) => setPenalty(e.target.value)}
                >
                  <MenuItem value={"financial"}>Financial</MenuItem>
                  <MenuItem value={"social"}>Social Media Post</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {penalty &&
              (penalty === "social" ? (
                <Grid item={true} xs={10}>
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Please enter what type of social media post we should post if you fail to reach your goal."
                    name="socialmediapenalty"
                    multiline={true}
                    rows={3}
                    error={errors.socialmediapenalty ? true : false}
                    helperText={
                      errors.socialmediapenalty &&
                      errors.socialmediapenalty.message
                    }
                    fullWidth={true}
                    inputRef={register({
                      required:
                        "Please enter what social media post we will post if you fail to reach your goal.",
                    })}
                  />
                </Grid>
              ) : (
                <Grid item={true} xs={4}>
                  <TextField
                    variant="outlined"
                    // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    label="Dollars"
                    name="financialpenalty"
                    multiline={true}
                    rows={1}
                    error={errors.financialpenalty ? true : false}
                    // value={dollars}
                    // onChange={(e) => setDollars(e.target.value)}
                    helperText={
                      errors.financialpenalty && errors.financialpenalty.message
                    }
                    fullWidth={true}
                    inputRef={register({
                      required: "Must enter a dollar amount",
                      pattern: /^[0-9]+(\.[0-9][0-9])?$/,
                    })}
                  />
                </Grid> */}
            {/* ))} */}
            {/* <Grid item={true} xs={12}>
              <TextField
                variant="outlined"
                type="text"
                label="Penalty"
                name="penalty"
                multiline={true}
                rows={3}
                error={errors.message ? true : false}
                helperText={errors.message && errors.message.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter your penalty for failing.",
                })}
              />
            </Grid> */}
            {/* button below */}
            <Grid item={true} xs={12}></Grid>
            <Grid style={{ textAlign: "center" }} item={true} xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={pending}
              >
                {!pending && <span>{"Generate Contract"}</span>}

                {pending && <CircularProgress size={28} />}
              </Button>
            </Grid>
            <Grid item={true} xs={12}></Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default Contact;
