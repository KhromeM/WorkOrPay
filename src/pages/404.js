import React from "react";
import Meta from "./../components/Meta";
import { Grid } from "@material-ui/core";
import four from '../resources/404.svg'

function NotFoundPage(props) {
  return (
    <>
      <Meta title="404" />
      <div
        style={{
          padding: "50px",
          width: "100%",
          textAlign: "center",
        }}
      >
        The page <code>{props.location.pathname}</code> could not be found
        <br/>
        <Grid item={true} xs={12} md={true}>
            <figure>
              <img
                src={four}
                alt="illustration"
              />
            </figure>
          </Grid>
      </div>
    </>
  );
}

export default NotFoundPage;
