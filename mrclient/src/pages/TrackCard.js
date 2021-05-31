import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  IconButton,
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
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Add,
  Done,
  ArrowUpward,
  ArrowDownward,
  PlayCircleOutlineRounded,
  PauseCircleOutlineRounded,
  LinkRounded,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  trackCard: {
    width: "100%",
    borderRadius: 0,
  },
  cardMedia: {
    width: "4em",
    height: "4em",
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
      paddingTop: 0,
    },
    minWidth: "20%",
    maxWidth: "40%",
    maxHeight: "64px",
    overflow: "auto",
    flexWrap: "no-wrap",
  },
}));


const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default function Layout(props) {
  const classes = useStyles();
  const [playing, toggle] = useAudio(props.previewUrl);
  const [vote, setVote] = useState(false);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const handleVote = (event) => {
    fetch("/playlist/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: props.name,
        trackID: props.trackID,
        vote: true,
      }),
    }).then((response) => {
      if (response.status === 201 || response.status === 200 ) {
        setVote(true);
      }
    });
  };
  return (
    <Card className={classes.trackCard}>
      <Grid container justify="space-between" alignItems="center">
        <CardMedia
          component="img"
          src={props.image.url}
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <Grid container justify="flex-start">
            <Typography variant="h6">
              {props.name} - {props.artists}
            </Typography>
          </Grid>
        </CardContent>

        <CardContent className={classes.cardContent}>
          {props.previewUrl ? (
            <Grid>
              <IconButton variant="outlined" onClick={toggle}>
                {playing ? (
                  <PauseCircleOutlineRounded />
                ) : (
                  <PlayCircleOutlineRounded />
                )}
              </IconButton>
              <IconButton
                variant="outlined"
                onClick={() => openInNewTab(props.songLink)}
              >
                <LinkRounded />
              </IconButton>
            </Grid>
          ) : (
            <Grid style={{ padding: "1em" }}>
              {vote ? (
                  <Button
                    variant="contained"
                    disabled
                    color="primary"
                  ><Done style={{color:"white"}} /></Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleVote}
                  color="primary"
                >
                  Vote!
                </Button>
              )}
            </Grid>
          )}
        </CardContent>
      </Grid>
    </Card>
  );
}
