const { Schema, model } = require("mongoose");
const { baby } = require("../utils/constants/model");
const { date } = require("../utils/constants/global");

const babySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [
      baby.NAME_MIN_LEN,
      `Name should be at least ${baby.NAME_MIN_LEN} characters long`,
    ],
    maxlength: [
      baby.NAME_MAX_LEN,
      `Name should be maximal ${baby.NAME_MAX_LEN} characters long`,
    ],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["boy", "girl"],
  },
  birthDate: {
    type: String,
    required: [true, "Birth date is required"],
    match: [date.DATE_PATTERN, "Birth date should be in format DD.MM.YYYY"],
  },
  birthTime: {
    type: String,
    required: [true, "Birth time is required"],
  },
  height: {
    type: Number,
    required: [true, "Height is required"],
    min: [baby.HEIGHT_MIN, "Height should be positive number"],
  },
  weight: {
    type: Number,
    required: [true, "Weight is required"],
    min: [baby.WEIGHT_MIN, "Weight should be positive number"],
  },
  picture: {
    type: String,
    required: [true, "Picture is required"],
  },
});

const Baby = model("Baby", babySchema);
module.exports = Baby;
