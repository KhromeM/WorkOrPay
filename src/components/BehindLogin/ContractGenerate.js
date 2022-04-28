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
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  tooltipClasses,
} from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import { createContract as createItem, updateUser } from "../../util/db";
import { useHistory } from "../../util/router";
import Warning from "./Warning";




function ContractGenerate(props) {
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [penalty, setPenalty] = useState("");
  const [warning, setWarning] = useState(false)
  const [warning2, setWarning2] = useState(false)
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

  if (auth.user.hasContract >= 3) {
    return (
      <div
        style={{
          marginTop: "30vh",
          marginRight: "10vh",
          marginLeft: "10vh",
          marginBottom: "30vh",
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        You currently have 3 contracts that are already valid. If you have completed one, please submit for verification and 
        wait untill an admin refreshes your account. Contact us by email or chat if you
        believe this message is an error.
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
    data.type = "contract";
    data.name = "default";
    console.log(data);

    // remove google sheets
    //
    //
    if (data.dollars === "0" || data.mode ==='deferred') {
      createItem({ owner: auth.user.uid, ...data })
        .then(() => {
          // Clear form
          reset();
          // Show success alert message
          setFormAlert({
            type: "success",
            message:
              "Your contract has been created! Get ready to achieve your goals!",
            message2: ((data.dollars === '0') ? 
            "No payment since you chose a $0 penalty. Redirecting you to your dashboard..." :
            "null"),
          });
          fetch(
            "https://v1.nocodeapi.com/envariable/google_sheets/ovhdVhojdGjnmUuz?tabId=Sheet1",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify([
                [
                  new Date().toISOString().slice(0, 10),
                  auth.user.email,
                  auth.user.name,
                  "free",
                  data.dollars,
                  "n/a",
                ],
              ]),
            }
          );

          setTimeout(() => {
            let hasContract
            if (!auth.user.hasContract) {
              hasContract = 0
            } else {
              hasContract = auth.user.hasContract}

            updateUser(auth.user.uid, {
              hasContract: hasContract+1,
              stripeContractPaidOrNot: "paid",
            });
            history.push("/dashboard");
          }, 1000);
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
      return;
    }
    console.log(data.dollars === "0", "dollars data");
    if (data.dollars !== "0")
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
      <Container maxWidth="sm" style={{ paddingTop: "30px" }}>
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
            <Divider
              style={{
                width: "100%",
                marginTop: "1vh",
                marginBottom: "1vh",
              }}
            />
            <Grid item={true} xs={12}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "3px",
                  marginTop: "16px",
                }}
              >
                <div style={{ fontSize: "17px" }}>
                  <strong>
                    Your Goal <span style={{ color: "red" }}>*</span>
                  </strong>
                </div>
                (The thing that you want to accomplish with us.)
              </div>
              <TextField
                variant="outlined"
                type="text"
                label="Try to be specific! Make it measureable. Don't just say 'I want to lose weight', instead, say 'I want to lose 7.5 pounds'."
                name="goal"
                InputLabelProps={{ style: { fontSize: 13, width: "95%" } }} // font size of input label
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
            {/* <Grid item={true} xs={12}></Grid> */}
            <Grid item={true} xs={12}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "3px",
                  marginTop: "35px",
                }}
              >
                <div style={{ fontSize: "17px" }}>
                  <strong>
                    Preferred Regular Accountability Contact Method{" "}
                    <span style={{ color: "red" }}>*</span>
                  </strong>
                </div>
                We're going to try to contact you regularly (daily or every few
                days) <strong>in the midst of your contract period.</strong>{" "}
                Include your number or profile link or email.
              </div>
              <TextField
                variant="outlined"
                type="text"
                label="Put anything you want: email, text, Messenger, Telegram, Whatsapp, or any other way! We will cater to you!"
                name="contactinfo"
                multiline={true}
                InputLabelProps={{ style: { fontSize: 13, width: "95%" } }} // font size of input label
                rows={5}
                error={errors.contactinfo ? true : false}
                helperText={errors.contactinfo && errors.contactinfo.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter your contact info",
                })}
              />
            </Grid>
            <Grid item={true} xs={12} md={12}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "5px",
                  fontSize: "16px",
                }}
              >
                <strong>
                  How often do you want to be contacted?{" "}
                  <span style={{ color: "red" }}>*</span>
                </strong>
              </div>
              <TextField
                // value={minutes}
                fullWidth
                variant="outlined"
                select
                size="large"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
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
                name="contactfrequency"
                // label="Daily Minutes"
                error={errors?.contactfrequency ? true : false}
                helperText={
                  errors?.contactfrequency && errors.contactfrequency.message
                }
                // onChange={(e) => setMinutes(e.target.value)}
                inputRef={register({
                  required: "Please choose your contact frequency.",
                })}
              >
                <option selected disabled value="">
                  Select Frequency
                </option>

                <option value={"daily"}>Daily</option>

                <option value={"everythreedays"}>Every 3 Days</option>
                <option value={"weekly"}>Weekly </option>
              </TextField>
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <Divider
              style={{
                width: "100%",
                marginTop: "5vh",
                marginBottom: "5vh",
              }}
            />{" "}
            <Grid item={true} xs={12}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "9px",
                  marginTop: "15px",
                }}
              >
                <div style={{ fontSize: "17px" }}>
                  <strong>
                    Suggest a Final Verification Method (Optional)
                  </strong>
                </div>
                How we would verify that you reached your goal at{" "}
                <strong>the end of your deadline</strong>. (Don't worry if
                you're not sure right now, skip this and we will contact you later and make a plan!)
              </div>
              <TextField
                variant="outlined"
                type="text"
                label=" Examples: Picture of you on the weight scale if your goal is weight related, Strava running app data if you want to run..."
                name="verificationmethod"
                multiline={true}
                InputLabelProps={{ style: { fontSize: 13, width: "95%" } }} // font size of input label
                rows={5}
                error={errors.verificationmethod ? true : false}
                helperText={
                  errors.verificationmethod && errors.verificationmethod.message
                }
                fullWidth={true}
                inputRef={register({})}
              />
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <i>Continue below...</i>
            </div>
            <Divider
              style={{
                width: "100%",
                marginTop: "5vh",
                marginBottom: "5vh",
              }}
            />{" "}
            <Grid item={true} xs={12} md={12}>
              <InputLabel
                style={{ textAlign: "center", marginBottom: "10px" }}
                id="dollars"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h2 style={{ paddingTop: "5px" }}>
                    Financial Penalty <span style={{ color: "red" }}>*</span>
                  </h2>
                </div>
                <div style={{ fontSize: "16px" }}>
                  This is the amount of money you put on the line in your
                  contract. If you fail reach your goal by the deadline, the
                  money will be donated to your chosen beneficiary below.{" "}
                </div>
                <br /> <br />

              </InputLabel>
              <h4>Dollar amount</h4>
              <TextField
                // value={minutes}
                fullWidth
                select
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ fontSize: 50 }}
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
                  required: "Please select your financial penalty.",
                })}
              >
                <option selected disabled value="">
                  Select an option{" "}
                </option>
                <option value={0}>
                  0 (You don't want a financial penalty as motivation)
                </option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={150}>150</option>
                <option value={250}>250</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </TextField>
              <br/> <br/> <br/>
              <h4>When will you be charged?</h4>
              <TextField
                // value={minutes}
                fullWidth
                select
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ fontSize: 50 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  style: { fontSize: 25 },
                }}
                type="text"
                name="mode"
                error={errors?.dollars ? true : false}
                helperText={errors?.dollars && errors.dollars.message}
                onChange={ e => setWarning(e.target.value)}

                inputRef={register({
                  required: "Please select when you would like to be charged.",
                })}
              >
                <option selected disabled value="">
                  Select an option{" "}
                </option>
                <option value={'deferred'} selected>No payment until you incur a penalty</option>
                <option value={'charge'}>Make the deposit now</option>

              </TextField>

              <Warning warning={warning}/>

              <br/> <br/>
              <h4>Type of penalty</h4>
              
              <TextField
                fullWidth
                select
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ fontSize: 50 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  style: { fontSize: 25 },
                }}
                type="text"
                onChange={e => setWarning2(e.target.value)}
                name="finPenType"
                error={errors?.dollars ? true : false}
                helperText={errors?.dollars && errors.dollars.message}
                inputRef={register({
                  required: "Please select which penalty structure you want",
                })}
              >
                <option disabled value="">
                  Select an option{" "}
                </option>
                <option selected value={'progressive'}> Progressive Penalty</option>
                <option value={'static'}> Static Penalty </option>
                
                

              </TextField>

              <Warning warning={warning2}/>
              
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <Divider
              style={{ width: "100%", marginTop: "5vh", marginBottom: "5vh" }}
            />{" "}
            <Grid item={true} xs={12} md={12}>
              <InputLabel
                style={{ marginBottom: "10px", textAlign: "center" }}
                id="days"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h3 style={{ paddingTop: "5px" }}>
                    Days Until Deadline <span style={{ color: "red" }}>*</span>
                  </h3>

                </div>
                <div style={{ fontSize: "16px" }}>
                  This is how many days you have to complete your goal. Make
                  sure to give yourself adequate time, but not enough for you to
                  procrastinate. The countdown starts as soon as you submit the
                  contract!
                </div>
              </InputLabel>

              <br />
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
                  required: "Must enter a value from 1 - 30 days",
                  pattern: {
                    value: /\b([1-9]|[12][0-9]|3[0])\b/,
                    message: "You must enter a number from 1 days to 30 days.",
                  },
                })}
              />
            </Grid>
            <Grid item={true} xs={12}></Grid>
            <Divider
              style={{ width: "100%", marginTop: "5vh", marginBottom: "5vh" }}
            />
            <Grid item={true} xs={12} md={12}>
              <InputLabel
                style={{ textAlign: "center", marginBottom: "10px" }}
                id="beneficiary"
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h3 style={{ paddingTop: "5px" }}>
                    Beneficiary of Donation{" "}
                    <span style={{ color: "red" }}>*</span>
                  </h3>
                </div>{" "}
                <br />
                <div style={{ fontSize: "16px" }}>
                  This is where your deposit is sent if you fail to reach your
                  goal by the deadline. Choose a charity if you want your money
                  going to a good cause. Or choose an{" "}
                  <strong>anti-charity</strong>, a cause you hate, to further
                  motivate yourself to not fail.
                </div>
                <br />
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

                <option value={"Humanitarian: GiveWell Maximum Impact fund"}>
                  Humanitarian: GiveWell Maximum Impact fund (Top-rated on
                  Charitywatch.com){" "}
                </option>
                {/* <option value={100}>GiveDirectly (Highly rated on Givewell.com)</option>
                <option value={100}>Helen Keller International (Highly rated on Givewell.com)</option>
                <option value={150}>Malaria Consortium (Highly rated on Givewell.com)</option> */}
                <option value={"Enviromental: The Conservation Fund"}>
                  Enviromental: The Conservation Fund (Top-rated on
                  Charitywatch.com)
                </option>
                <option value={"Animal Welfare Institute"}>
                  Animal Welfare Institute (Top-rated on Charitywatch.com)
                </option>
                <option value={"The Republican National Party"}>
                  ANTI-CHARITY: The Republican National Party (RNC)
                </option>
                <option value={"The Democratic National Party"}>
                  ANTI-CHARITY: The Democratic National Party (DNC)
                </option>
                <option value={"CustomRequest"}>
                  OTHER: Send us a message and tell us the cause you would like
                  to send your money to.
                </option>
              </TextField>
            </Grid>
            <Grid item={true} xs={12}></Grid>
            
            <Divider
              style={{ width: "100%", marginTop: "5vh", marginBottom: "5vh" }}
            />

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

export default ContractGenerate;






// <Divider
//               style={{ width: "100%", marginTop: "5vh", marginBottom: "5vh" }}
//             />
//             <Grid item={true} xs={10} md={8}>
//               <InputLabel
//                 style={{ textAlign: "center", marginBottom: "10px" }}
//                 id="phone"
//               >
//                 <div
//                   style={{
//                     marginLeft: "22px",
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <h3 style={{ paddingTop: "5px" }}>Phone Number</h3>

//                 </div>{" "}
//                 <div>(Optional)</div>
//                 <br />
//                 <div style={{ fontSize: "16px" }}>
//                   We check in with you daily via text to make sure you are
//                   staying on track. You can opt out of this by simply leaving
//                   this blank. <br />
//                   <br></br>If you want to opt-in later, just send us a message
//                   using chat or the contact us page.
//                 </div>
//                 <br />
//               </InputLabel>

//               <TextField
//                 variant="outlined"
//                 // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}

//                 name="phone"
//                 multiline={true}
//                 rows={1}
//                 error={errors.phone ? true : false}
//                 // value={dollars}
//                 // onChange={(e) => setDollars(e.target.value)}
//                 helperText={errors.phone && errors.phone.message}
//                 InputLabelProps={{ shrink: true }}
//                 InputProps={{
//                   inputProps: {
//                     style: { textAlign: "center" },
//                   },
//                 }}
//                 fullWidth={true}
//                 // defaultValue={8008008000}
//                 inputRef={register({
//                   // required: "Must enter a phone number",
//                   // not required
//                   pattern: {
//                     value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
//                     message: "You must enter a valid 10 digit phone number.",
//                   },
//                 })}
//               />
//             </Grid>