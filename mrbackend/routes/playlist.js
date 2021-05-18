var express = require("express");
var router = express.Router();
var request = require("request");
var SpotifyApi = require("./spotifyapi.js");
var Track = require("../models/track.js")
var got = require("got");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  if (SpotifyApi.tokenExpired()) {
    await SpotifyApi.refreshAccessToken();
  }
  try {
    const items = await SpotifyApi.getPlaylistItems();
    res.send(items);
  } catch (err) {
    console.log(err);
    res.send(err)
  }
});

router.post("/", (req, res) => {
  const _id = new mongoose.Types.ObjectId();
  const {
    name,
    trackID,
    positiveVotes,
    negativeVotes

  } = req.body;

  //Creates recipe
  const newTrack = new Track({
    name,
    trackID,
    positiveVotes,
    negativeVotes
  });

  //Saves recipe
  newTrack
    .save()
    .then(() => res.status(201).json("Track Created"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:search", async function (req, res, next) {
  if (SpotifyApi.tokenExpired()) {
    await SpotifyApi.refreshAccessToken();
  }
  try {
    const items = await SpotifyApi.trackSearch(req.params.search);
    res.send(items);
  } catch (err) {
    console.log(err);
    res.send(err)
  }
});

module.exports = router;
