import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VoteBox from "./VoteBox";
import TrackList from "./TrackList";

const useStyles = makeStyles((theme) => ({
  contentBox: {
    width: "80%",
    height: "80%",
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
  const [playlist, setPlaylist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Grid
      container
      className={classes.contentBox}
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <TrackList />
      <VoteBox />
    </Grid>
  );
}
