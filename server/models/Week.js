const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const weekSchema = new Schema({
  title: {
    type: Number,
  },
  subTitle: {
    type: String,
  },
  text: {
    type: String,
  },
  trimester: {
    type: String,
    enum: ["first", "second", "third"],
  },
  mood: {
    type: [String],
    enum: [
      "happy",
      "sad",
      "angry",
      "melancholic",
      "surprised",
      "excited",
      "optimistic",
      "sentimental",
      "cheerful",
      "hopeful",
      "hopeless",
      "pessimistic",
      "romantic",
      "calm",
      "emotional",
      "safe",
      "warm",
      "unconfortable",
      "incertain",
      "scared",
      "refreshing",
      "relaxed",
      "suspicious",
      "terrified",
      "powerful",
      "playful",
      "peaceful",
      "panicked",
      "nostalgic",
      "lonely",
      "isolated",
      "grateful",
      "dreamy",
      "depressed",
      "confortable",
    ],
    default: [],
  },
  myWeight: {
    type: Number,
    default: 0,
  },
  myBellySize: {
    type: Number,
    default: 0,
  },
  babyWeight: {
    type: Number,
    default: 0,
  },
  babyHeight: {
    type: Number,
    default: 0,
  },
  moments: {
    type: [ObjectId],
    ref: "Moment",
    default: [],
  },
});

const Week = model("Week", weekSchema);
module.exports = Week;
