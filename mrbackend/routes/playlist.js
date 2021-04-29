var express = require("express");
var router = express.Router();
var request = require("request");
var SpotifyApi = require("./spotifyapi.js");
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
