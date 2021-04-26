var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var request = require("request");

var playlistRouter = require("./routes/playlist");

var app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/playlist", playlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// var refresh_token = process.env.REFRESH_TOKEN;
// var authOptions = {
//   url: "https://accounts.spotify.com/api/token",
//   headers: {
//     Authorization:
//       "Basic " +
//       new Buffer(
//         process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
//       ).toString("base64"),
//   },
//   form: {
//     grant_type: "refresh_token",
//     refresh_token: refresh_token,
//   },
//   json: true,
// };
// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     getPlaylist(body.access_token);
//   }
// });
//
// function getPlaylist(accessToken) {
//   var authOptions_two = {
//     url:
//       "https://api.spotify.com/v1/playlists/3C0lhwNINsyN2Ufw2ILbm7/tracks?market=from_token",
//     headers: {
//       'Authorization': "Bearer " + accessToken,
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     json: true,
//
//   };
//   request.get(authOptions_two, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log(body.items[0].track.album);
//     }
//     else{
//       console.log(error);
//       console.log(response);
//     }
//   });
// }

module.exports = app;
