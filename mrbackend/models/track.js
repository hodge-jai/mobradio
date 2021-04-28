const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const trackSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  trackID: { type: String, required: true},
  positiveVotes: { type: Number, default: 0},
});

const Track = mongoose.model("Track", trackSchema);
module.exports = Track;
