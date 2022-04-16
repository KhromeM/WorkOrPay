import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useRouter } from "../../util/router";
import { useAuth } from "../../util/auth";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import pdf from "../resources/example.pdf"


const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function Contract() {
  const classes = useStyles();

  const auth = useAuth();
  const router = useRouter();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Card>

      <Typography variant="h6" paragraph={true}>
        <strong> Your Contract</strong>
      </Typography>

      <CardContent className={classes.cardContent}>

        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height={300} pageNumber={pageNumber} />
        </Document>
        
        <p>
          Page {pageNumber} of {numPages}
        </p>

      </CardContent>
    </Card>
  );
}

export default Contract;
