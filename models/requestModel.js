const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  serialNo: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  modeOfTravel: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  bookedby: [{ type: Schema.Types.ObjectId, ref: "user" }],
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("request", RequestSchema);
