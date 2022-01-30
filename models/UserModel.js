const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mailId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rollNo: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  requests: [{ type: Schema.Types.ObjectId, ref: "request" }],
});

module.exports = mongoose.model("user", UserSchema);
