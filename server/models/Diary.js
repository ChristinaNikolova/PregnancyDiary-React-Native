const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { date } = require("../utils/constants/global");
const { diary } = require("../utils/constants/model");

const diarySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [
      diary.TITLE_MIN_LEN,
      `Title should be at least ${diary.TITLE_MIN_LEN} characters long`,
    ],
    maxlength: [
      diary.TITLE_MAX_LEN,
      `Title should be maximal ${diary.TITLE_MAX_LEN} characters long`,
    ],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [
      diary.DESC_MIN_LEN,
      `Description should be at least ${diary.DESC_MIN_LEN} characters long`,
    ],
    maxlength: [
      diary.DESC_MAX_LEN,
      `Description should be maximal ${diary.DESC_MAX_LEN} characters long`,
    ],
  },
  positiveTestDate: {
    type: String,
    required: [true, "Date is required"],
    match: [date.DATE_PATTERN, "Date date should be in format DD.MM.YYYY"],
  },
  dueDate: {
    type: String,
    required: [true, "Date is required"],
    match: [date.DATE_PATTERN, "Date should be in format DD.MM.YYYY"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["boy", "girl", "i don't know yet", "surprice"],
  },
  isBabyBorn: {
    type: Boolean,
    default: false,
  },
  baby: {
    type: ObjectId,
    ref: "Baby",
  },
  creator: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  weeks: {
    type: [ObjectId],
    ref: "Week",
    default: [],
  },
});

const Diary = model("Diary", diarySchema);
module.exports = Diary;
