import React from "react";
import "./SearchScreen.css";
import _ from "lodash";

import { Paper, Container, Grid, Typography } from "@material-ui/core";

export default function NoResults() {
  return (
    <Container maxWidth="sm">
      <Grid container justify="center" direction="row">
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          className="no-results-form"
        >
          <Paper
            variant="elevation"
            elevation={20}
            className="no-results-background"
          >
            <Grid item container justify="center">
              <Typography component="h1" variant="h4">
                No results
              </Typography>
            </Grid>
            <Grid item container justify="center">
              <Typography component="h1" variant="h6">
                Please try again
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
