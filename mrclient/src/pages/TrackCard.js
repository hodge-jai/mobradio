import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  IconButton,
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
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";

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

export default function Layout(props) {
  const classes = useStyles();
  const [playlist, setPlaylist] = useState([]);
  return (
    <Card className={classes.trackCard}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
      >
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
          <IconButton variant="outlined">
            <ArrowUpward />
          </IconButton>
          <IconButton variant="outlined">
            <ArrowDownward />
          </IconButton>
        </CardContent>
      </Grid>
    </Card>
  );
}
