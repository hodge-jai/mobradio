var express = require("express");
var router = express.Router();
var request = require("request");
var SpotifyApi = require("./spotifyapi.js");
var mongoose = require("mongoose");
var Track = require("../models/track.js");
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
    res.send(err);
  }
});

router.post("/", (req, res) => {
  Track.exists({ trackID: req.body.trackID }, function (err, docs) {
    if (err) {
      console.log(err);
      res.status(400).json("Error: " + err);
    }
    if (!docs) {
      const _id = new mongoose.Types.ObjectId();

      const { name, trackID } = req.body;

      //Creates track record
      const newTrack = new Track({
        name,
        trackID,
      });
      if (req.body.vote) {
        newTrack.positiveVotes = 1;
      } else {
        newTrack.negativeVotes = 1;
      }

      //Saves track
      newTrack
        .save()
        .then(() => res.status(200).json("Track Created"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      const trackID = req.body.trackID;
      console.log(req.body);
      const voteType = req.body.vote ? "positiveVotes" : "negativeVotes";
      console.log("My Docs: " + docs);
      Track.findOneAndUpdate(
        { trackID: trackID },
        { $inc: { [voteType]: 1 } },
        { new: true },
        async function (err, response) {
          if (err) {
            console.log(err);
          } else {
            if (response.positiveVotes >= 5 && !response.inPlaylist) {
              await SpotifyApi.addToPlaylist(trackID);
              await Track.findOneAndUpdate(
                { trackID: trackID },
                { inPlaylist: true },
                { new: true }
              );
            }
            console.log(response);
          }
        }
      );
      res.status(201).json("Vote counted " + voteType);
    }
  });
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
    res.send(err);
  }
});

module.exports = router;
