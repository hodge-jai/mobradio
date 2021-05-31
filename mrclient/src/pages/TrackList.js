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
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TrackCard from "./TrackCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "100%",
    background: "#FFFFFF",
    overflow: 'auto',
  },
  contentBox: {
    width: "80%",
    height: "80%",
  },
  trackList: {
    height: "100%",
  },
  trackItem: {
    paddingBottom: 0,
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [playlist, setPlaylist] = useState([]);
  const [page, pageRefresh] = useState(false)


  useEffect(() => {
    fetch("/playlist/")
      .then((res) => res.json())
      .then((data) => setPlaylist(data));

    return function cleanup() {
      console.log(playlist);
    };
  }, []);

  return (
    <Grid item xs={12} md={6} lg={6}  className={classes.trackList}>
      <Paper className={classes.paper} square>
        <List>
          {playlist.map((item) => (
            <ListItem
              key={`item-${item.track.id}`}
              className={classes.trackItem}
            >
              <TrackCard
                previewUrl={item.track.preview_url}
                songLink={item.track.external_urls.spotify}
                trackID={item.track.id}
                name={item.track.name}
                artists={item.track.artists[0].name}
                image={item.track.album.images[0]}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
}
