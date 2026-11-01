require("dotenv").config();
const express = require("express");
const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");
const { messages } = require("./utils/constants/global");

start();

async function start() {
  try {
    const app = express();

    expressConfig(app);
    await databaseConfig();
    routesConfig(app);

    const port = process.env.PORT || 3030

    app.listen(port, () => console.log(messages.REST_STARTED))
  } catch (err) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}
