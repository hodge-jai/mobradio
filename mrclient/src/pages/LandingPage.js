import React from "react";
import {
  Grid,
  Paper,
  Button,
  Divider,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ContentBox from "./ContentBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100vh",
    overflow: "auto",
    background: "#3a404a",
  },
}));

export default function Layout() {
  const classes = useStyles();
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid
        container
        item
        xs={12}
        style={{ width: "80%", maxHeight: "100px", padding: "1em" }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome To MobRadio!
        </Typography>
        <Typography gutterBottom>
          MobRadio is the internet's playlist. To vote on a track you would like
          to see added to the playlist, use the search bar on the right. Tracks
          need a minimum of 10 votes to make on the list. The list itself is
          ordered by the number of votes. The playlist is housed on Spotify and
          can be found{" "}
          <Link
            href="https://open.spotify.com/playlist/3C0lhwNINsyN2Ufw2ILbm7?si=69b2cb4727ab45d0"
            target="_blank"
            rel="noreferrer noopener"
            color="secondary"
            variant="body1"
          >
            here
          </Link>
          .
        </Typography>
      </Grid>
      <ContentBox />
    </Grid>
  );
}
