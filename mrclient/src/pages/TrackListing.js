import React from "react";
import { Grid, Paper, Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    height: "80%",
    background: "#FFFFFF",
  },
  contentBox: {
    width: "100%",
    height: "100%",
  },
  trackList: {
    width: "50%",
    height: "100%",
  },
  divider: {
    background: "#3a404a",
    width: "3px",
    marginLeft: 0,
    marginRight: 0,
  },
}));

export default function Layout() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={10} square>
      <Grid
        container
        className={classes.contentBox}
        justify="flex-start"
        alignItems="center"
      >
        <Grid className={classes.trackList}></Grid>
        <Divider
          className={classes.divider}
          orientation="vertical"
          variant="middle"
          flexItem
        />
      </Grid>
    </Paper>
  );
}
