var express = require("express");
var router = express.Router();
var request = require("request");

var accessToken;

if (!accessToken) {
  refreshAccessToken();
  console.log(accessToken);
}
function refreshAccessToken() {
  var refreshToken = process.env.REFRESH_TOKEN;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      accessToken = body.access_token;
    }
  });
}

function getPlaylist() {
  var authOptions = {
    url:
      "https://api.spotify.com/v1/playlists/3C0lhwNINsyN2Ufw2ILbm7/tracks?market=from_token",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    json: true,
  };
  console.log("Made it");
  request.get(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body.items[0].track.album);
      return body.items;
    } else {
      refreshAccessToken();
      getPlaylist();
    }
  });
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  var authOptions = {
    url:
      "https://api.spotify.com/v1/playlists/3C0lhwNINsyN2Ufw2ILbm7/tracks?market=from_token",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    json: true,
  };
  console.log("Made it");
  request.get(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body.items[0].track.album);
      res.end(body.items);
    } else {
      refreshAccessToken();
    }
  });
});

module.exports = router;
