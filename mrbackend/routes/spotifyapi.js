var express = require("express");
var router = express.Router();
var got = require("got");
var querystring = require("querystring");

class SpotifyApi {
  constructor() {
    this.accessToken = "";
    this.lastRefresh = new Date("July 21, 1983 01:15:00");
  }
  async refreshAccessToken() {
    var refreshToken = process.env.REFRESH_TOKEN;
    var authOptions = {
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
      responseType: "json",
    };
    try {
      const { body } = await got.post(
        "https://accounts.spotify.com/api/token",
        authOptions
      );
      this.accessToken = body.access_token;
      this.lastRefresh = Date.now();
      console.log(this.accessToken);
    } catch (err) {
      console.log(err);
    }
  }

  tokenExpired() {
    let milliseconds = Math.abs(Date.now() - this.lastRefresh);
    let hours = milliseconds / 36e5;
    return hours > 1;
  }

  async getPlaylistItems() {
    var authOptions = {
      headers: {
        Authorization: "Bearer " + this.accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    };
    try {
      const { body } = await got(
        "https://api.spotify.com/v1/playlists/3C0lhwNINsyN2Ufw2ILbm7/tracks?market=from_token",
        authOptions
      );
      return JSON.stringify(body.items);
    } catch (err) {
      return err;
    }
  }
  async trackSearch(search) {
    var query =
      "https://api.spotify.com/v1/search?q=" +
      querystring.escape(search) +
      "&type=track";
    var authOptions = {
      headers: {
        Authorization: "Bearer " + this.accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    };
    try {
      const { body } = await got(query, authOptions);
      console.log(body.tracks.items[0].name)
      return JSON.stringify(body.tracks.items);
    } catch (err) {
      return err;
    }
  }
}
var SAInstance = new SpotifyApi();

module.exports = SAInstance;
