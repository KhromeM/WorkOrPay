import { Card, CardContent } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function Warning({ warning }) {
  let output;

  if (warning === "progressive") {
    output = (
      <Alert severity="info">
        <div style={{ fontSize: "14px", lineHeight: 1.3 }}>
          <strong>Progressive Penalties:</strong> <br />
          <p>
            {" "}
            Instead of being charged the whole penalty as soon as you fail. You
            are charged a percentage of it twice proportional to how much you
            missed you goal by.{" "}
          </p>{" "}
          <br />
          <strong>Recommendation:</strong> <br />
          <p>
            {" "}
            Choose progressive penalties for habit forming and lifestyle
            changes. <br />
            When you are forming a habit such as going to the gym every day or
            switching to a new diet, its hard to stay perfect. Choosing
            progressive penalties lets you miss a day, but at a cost. It also
            encourages you to get back on track ASAP before you lose even more
            money.
          </p>
          <p>
            Example: You form a contract to run every day for 10 days or lose
            $100. Sadly, you miss one day of running. Instead of losing the
            whole $100, you only lose $20. <em> (1/10 * 2 * $100).</em>{" "}
          </p>
        </div>
      </Alert>
    );
  }
  if (warning === "static") {
    output = (
      <Alert severity="info">
        <div style={{ fontSize: "14px", lineHeight: 1.3 }}>
          <strong>Static Penalties:</strong> <br />
          <p>
            {" "}
            You are charged the whole penalty even if you miss your goal by a
            tiny bit.
          </p>{" "}
          <br /> <br />
          <strong>Recommendation:</strong> <br />
          <p>
            {" "}
            Choose static penalties for one off goals such as: Luanching your
            website. Starting a youtube channel. Enrolling in a class. <br />
            For these goals the difference between almost doing it and acctually
            doing it is huge. By choosing a static penalty, you force yourself
            to take the final step.
          </p>
          <p>
            Example: You form a contract to launch your website in 10 days or
            lose $100. Sadly, you only finish 95% of the work, and do not
            launch. You are charged the entire penalty.{" "}
          </p>
        </div>
      </Alert>
    );
  }
  if (warning === "deferred") {
    output = (
      <Card>
        <CardContent>
          <div style={{ fontSize: "14px", textAlign: "center" }}>
            <strong>
              You are only charged if you miss your goal and incur a penalty
            </strong>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (warning === "charged") {
    output = (
      <Card>
        <CardContent>
          <Alert severity="warning">
            {" "}
            <strong>
              Payment processing fees are deducted from your deposit.
            </strong>
          </Alert>
          <div
            style={{ fontSize: "14px", lineHeight: 1.3, textAlign: "center" }}
          >
            <div style={{ color: "#ff0800" }}>
              <p></p>
              <p>
                Transaction Processing Fees: 3% with credit card. 1% with bank.
                Extra 2% for outside US.
              </p>
            </div>
            <strong>We do not profit from this.</strong>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <br /> <br />
      {output}
    </>
  );
}
