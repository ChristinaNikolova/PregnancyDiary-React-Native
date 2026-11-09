const mongoose = require("mongoose");
const { messages, errors } = require("../utils/constants/global");
require("../models/Article");
require("../models/Baby");
require("../models/Category");
require("../models/TokenBlacklist");
require("../models/Diary");
require("../models/Moment");
require("../models/User");
require("../models/Week");

module.exports = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
      // todo add variable
      throw new Error("MONGODB_URI is not defined")
    }

    await mongoose.connect(connectionString);

    console.log(messages.DATABASE_CONNECTED);

    mongoose.connection.on("error", (err) => {
      console.error(errors.DATABASE);
      console.error(err);
    });
  } catch (err) {
    console.error(errors.DATABASE_CONNECTION);
    console.log(err);
    process.exit(1);
  }
};
