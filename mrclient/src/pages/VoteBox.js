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
import TrackCard from "./TrackCard";

const useStyles = makeStyles((theme) => ({
  voteBox: {
    height: "100%",
  },
  paper: {
    width: "100%",
    background: "#FFFFFF",
    textAlign: "center",
  },
  formArea: {
    margin: "1em 1em 1em 1em",
  },
  textField: {
      [`& fieldset`]: {
        borderRadius: 0,
      },
  },
  trackItem: {
    paddingBottom: "0.3em",
    paddingTop: 0,
  },
  listArea: {
    width: "100%",
    height: "80%",
    overflow: "auto",
  },
  list: {
    paddingTop: 0,
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [queryState, setQueryState] = useState(false);
  const handleChange = (event) => {
    event.target.value === ""
      ? setQueryState(false)
      : (function () {
          setQueryState(true);
          fetch("/playlist/" + event.target.value)
            .then((res) => res.json())
            .then((data) => setSearchResults(data));
        })();
  };

  return (
    <Grid
      container
      item
      xs={6}
      alignItems="flex-start"
      className={classes.voteBox}
      spacing={1}
    >
      <Paper className={classes.paper} square>
        <Grid className={classes.formArea}>
          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            onChange={handleChange}
          ></TextField>
        </Grid>
      </Paper>
      <Paper className={classes.listArea} square>
        {queryState ? (
          <List className={classes.list}>
            {searchResults.map((item) => (
              <ListItem key={`item-${item.id}`} className={classes.trackItem}>
                <TrackCard
                  name={item.name}
                  image={item.album.images[0]}
                  artists={item.album.artists[0].name}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ height: "90%" }}
          >
            <Typography variant="h6">
              Search Results Will Be Displayed Here
            </Typography>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
}
