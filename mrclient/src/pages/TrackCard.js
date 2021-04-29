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
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const [playlist, setPlaylist] = useState([]);
  return (
    <Card className={classes.trackCard}>
      <Grid container justify="flex-start" alignItems="center" raised>
        <CardMedia
          component="img"
          src={props.image.url}
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <Typography>
            {props.name} - {props.artists}
          </Typography>
        </CardContent>
      </Grid>
    </Card>
  );
}
