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
import { ReactComponent as InfoIcon } from "../../resources/infoicon.svg";

import {
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  tooltipClasses,
} from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import { createItem } from "../../util/db";
import { useHistory } from "../../util/router";

function Contact(props) {
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [penalty, setPenalty] = useState("");
  const { handleSubmit, register, errors, reset } = useForm();
  const history = useHistory();

  const auth = useAuth();
  // console.log(auth.user.displayName);

  if (!auth.user || auth.user.planIsActive == false) {
    return (
      <>
        <div
          style={{
            marginTop: "30vh",
            marginBottom: "30vh",
            textAlign: "center",
            fontSize: "30px",
          }}
        >
          You don't have a subscription. You need to buy a subscription to
          create a contract.
          <br />
          <Button
            variant="filled"
            style={{ backgroundColor: "gray", marginTop: "20px" }}
            onClick={() => {
              history.push("/pricing");
            }}
          >
            Buy Now
          </Button>
        </div>
      </>
    );
  }

  if (auth.user.hasContract) {
    return (
      <div
        style={{
          marginTop: "30vh",
          marginBottom: "30vh",
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        You currently have a contract that is live. Please wait till a site
        admin refreshes your account or contact us by email or chat if you
        believe this is an error.
        <br />
        <Button
          variant="filled"
          style={{ backgroundColor: "gray", marginTop: "20px" }}
          onClick={() => {
            history.push("/");
          }}
        >
          Home{" "}
        </Button>
      </div>
    );
  }

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);
    console.log(data);
    // data.minutes = minutes.toString();
    // data.hours = hours.toString();
    data.penalty = penalty;
    data.type = "contract";
    data.name = "default";
    console.log(data);

    // remove google sheets
    //
    //

    createItem({ owner: auth.user.uid, ...data })
      .then(() => {
        // Clear form
        reset();
        // Show success alert message
        setFormAlert({
          type: "success",
          message:
            "Your contract has been created! Get ready to achieve your goals!",
          message2: "Redirecting you to make your deposit on Stripe...",
        });
        setTimeout(() => {
          history.push(`/purchasesingle/contract${data.dollars}`);
        }, 2000);
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
        <Alert severity={formAlert.type}>
          {formAlert.message}
          <br />
          <br />
          {formAlert.message2}
        </Alert>
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
            <Alert severity={formAlert.type}>
              {formAlert.message}
              <br />
            </Alert>
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
            <Grid item={true} xs={8} md={3}>
              <InputLabel
                style={{ textAlign: "center", marginBottom: "10px" }}
                id="dollars"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ paddingTop: "5px" }}>Financial Penalty</div>
                  <Tooltip
                    placement="right"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "5px",
                      paddingTop: "4px",
                    }}
                    title={
                      <p
                        style={{
                          fontFamily: "Inter",
                          lineHeight: "1.5",
                          fontSize: "17px",
                        }}
                      >
                        This is the amount of money you put down towards your
                        contract. If you pass your goals, you will get this
                        amount back. If you don't pass your goals, this money
                        gets donated to your chosen beneficiary below. (Please
                        note there is a <strong>3%</strong> transaction fee owed
                        to our payment processor Stripe.com! You will get back
                        97% of your funds. We tried to avoid it!)
                      </p>
                    }
                    arrow
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
                <div style={{ fontSize: "16px" }}>(3% charge)</div>
              </InputLabel>

              <TextField
                // value={minutes}
                fullWidth
                select
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true, style: { fontSize: 50 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  style: { fontSize: 25 },
                }}
                type="text"
                name="dollars"
                // label="Daily Minutes"
                error={errors?.dollars ? true : false}
                helperText={errors?.dollars && errors.dollars.message}
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
            <Grid item={true} xs={4} md={3}>
              <InputLabel
                style={{ marginBottom: "10px", textAlign: "center" }}
                id="days"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ paddingTop: "5px" }}>Days Until Deadline</div>
                  <Tooltip
                    placement="right"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "5px",
                      paddingTop: "4px",
                    }}
                    title={
                      <p
                        style={{
                          fontFamily: "Inter",
                          lineHeight: "1.5",
                          fontSize: "17px",
                        }}
                      >
                        This is the amount of money you put down towards your
                        contract. If you pass your goals, you will get this
                        amount back. If you don't pass your goals, this money
                        gets donated to your chosen beneficiary below. (Please
                        note there is a <strong>3%</strong> transaction fee owed
                        to our payment processor Stripe.com! You will get back
                        97% of your funds. We tried to avoid it!)
                      </p>
                    }
                    arrow
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
              </InputLabel>
              <TextField
                variant="outlined"
                // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}

                name="days"
                multiline={true}
                rows={1}
                error={errors.days ? true : false}
                // value={dollars}
                // onChange={(e) => setDollars(e.target.value)}
                helperText={errors.days && errors.days.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
                fullWidth={true}
                defaultValue={7}
                inputRef={register({
                  required: "Must enter a value from 3 - 30 days",
                  pattern: {
                    value: /\b([3-9]|[12][0-9]|3[0])\b/,
                    message: "You must enter a number from 3 days to 30 days.",
                  },
                })}
              />
            </Grid>
            <Grid item={true} xs={12}></Grid>

            <Grid item={true} xs={12} md={5}>
              <InputLabel
                style={{ textAlign: "center", marginBottom: "10px" }}
                id="beneficiary"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ paddingTop: "5px" }}>
                    Beneficiary of Donation
                  </div>
                  <Tooltip
                    placement="right"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "5px",
                      paddingTop: "4px",
                    }}
                    title={
                      <p
                        style={{
                          fontFamily: "Inter",
                          lineHeight: "1.5",
                          fontSize: "17px",
                        }}
                      >
                        This is the amount of money you put down towards your
                        contract. If you pass your goals, you will get this
                        amount back. If you don't pass your goals, this money
                        gets donated to your chosen beneficiary below. (Please
                        note there is a <strong>3%</strong> transaction fee owed
                        to our payment processor Stripe.com! You will get back
                        97% of your funds. We tried to avoid it!)
                      </p>
                    }
                    arrow
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>{" "}
              </InputLabel>
              <TextField
                // value={minutes}
                fullWidth
                variant="outlined"
                select
                size="large"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true, style: { fontSize: 50 } }}
                InputProps={{
                  inputProps: {
                    style: {
                      height: "20px",
                      fontSize: "18px",
                      textAlign: "center",
                    },
                  },
                }}
                type="text"
                name="beneficiary"
                // label="Daily Minutes"
                error={errors?.beneficiary ? true : false}
                helperText={errors?.beneficiary && errors.beneficiary.message}
                // onChange={(e) => setMinutes(e.target.value)}
                inputRef={register({
                  required: "Please choose your beneficiary.",
                })}
              >
                <option selected disabled value="">
                  Select a beneficiary{" "}
                </option>
                <option value={25}>(Anti-Charity) Trump Super PAC</option>
                <option value={1000}>(Anti-Charity) Clinton Foundation</option>
                <option value={50}>Doctors Without Border</option>
                <option value={100}>Abortion</option>
                <option value={150}>Against Malaria Foundation</option>
                <option value={250}>Climate Change Fund</option>
                <option value={500}>Animal Welfare</option>
              </TextField>
            </Grid>
            <Grid item={true} xs={12}></Grid>

            <Grid item={true} xs={4} md={4}>
              <InputLabel
                style={{ textAlign: "center", marginBottom: "10px" }}
                id="phone"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ paddingTop: "5px" }}>Phone Number</div>
                  <Tooltip
                    placement="right"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "5px",
                      paddingTop: "4px",
                    }}
                    title={
                      <p
                        style={{
                          fontFamily: "Inter",
                          lineHeight: "1.5",
                          fontSize: "17px",
                        }}
                      >
                        This is the amount of money you put down towards your
                        contract. If you pass your goals, you will get this
                        amount back. If you don't pass your goals, this money
                        gets donated to your chosen beneficiary below. (Please
                        note there is a <strong>3%</strong> transaction fee owed
                        to our payment processor Stripe.com! You will get back
                        97% of your funds. We tried to avoid it!)
                      </p>
                    }
                    arrow
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>{" "}
              </InputLabel>

              <TextField
                variant="outlined"
                // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}

                name="phone"
                multiline={true}
                rows={1}
                error={errors.phone ? true : false}
                // value={dollars}
                // onChange={(e) => setDollars(e.target.value)}
                helperText={errors.phone && errors.phone.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
                fullWidth={true}
                defaultValue={8008008000}
                inputRef={register({
                  required: "Must enter a phone number",
                  pattern: {
                    value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                    message: "You must enter a valid 10 digit phone number.",
                  },
                })}
              />
            </Grid>
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
