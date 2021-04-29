import React from "react";
import { Grid, Paper, Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ContentBox from "./ContentBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100vh",
    background: "#3a404a",
  },
}));

export default function Layout() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <ContentBox />
    </Grid>
  );
}
