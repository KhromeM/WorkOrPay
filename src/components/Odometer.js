import { Grid, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import "./odometer.css";
function Odometer() {
  const matches = useMediaQuery("(max-width:692px)");
  const matches2 = useMediaQuery("(max-width:426px");
  return (<> </>)
  return (
    <div>
      <div className="container">
        <div
          className="contodo row justify-content-center mt-5"
          style={{
            height: "75px",
            display: "flex",
            justifyContent: "center",
            flexWrap: matches ? "wrap" : null,
          }}
        >
          {/* <div className="timer-part">$</div> */}
          <div className="timer-part">1</div>
          <div className="timer-part">6</div>
          <Typography variant="h2">,</Typography>
          <div className="timer-part">8</div>
          <div className="timer-part">2</div>
          <div className="timer-part">5</div>
          <div
            style={{
              paddingTop: "13px",
              marginLeft: !matches ? "20px" : null,
              textAlign: matches ? "center" : null,
              flexBasis: matches ? "100%" : null,
            }}
            className="ododollar"
          >
            <Typography variant={matches2 ? "h4" : "h3"}>
              Dollars Staked {matches ? "by" : null}
            </Typography>
          </div>
        </div>
        <div
          className="row justify-content-center mt-5"
          style={{
            height: "75px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <div style={{ marginTop: matches ? "50px" : null }}>
            <Typography variant="h4">{!matches ? "by" : null}</Typography>
          </div>
        </div>
        <div
          className="row justify-content-center mt-5"
          style={{
            height: "75px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="timer-part">1</div>
          <div className="timer-part">2</div>
          <div className="timer-part">4</div>
          <div style={{ paddingTop: "13px", marginLeft: "20px" }}>
            <Typography variant="h3">Users</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Odometer;
