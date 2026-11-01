const { Schema, model } = require("mongoose");
const { moment } = require("../utils/constants/model");
const { date } = require("../utils/constants/global");

const momentSchema = new Schema({
  date: {
    type: String,
    required: [true, "Date is required"],
    match: [date.DATE_PATTERN, "Date should be in format DD.MM.YYYY"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [
      moment.TITLE_MIN_LEN,
      `Title should be at least ${moment.TITLE_MIN_LEN} characters long`,
    ],
    maxlength: [
      moment.TITLE_MAX_LEN,
      `Title should be maximal ${moment.TITLE_MAX_LEN} characters long`,
    ],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [
      moment.CONTENT_MIN_LEN,
      `Content should be at least ${moment.CONTENT_MIN_LEN} characters long`,
    ],
    maxlength: [
      moment.CONTENT_MAX_LEN,
      `Content should be maximal ${moment.CONTENT_MAX_LEN} characters long`,
    ],
  },
});

const Moment = model("Moment", momentSchema);
module.exports = Moment;
