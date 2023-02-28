const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
const middleware = require("./middleware/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const postRouter = require("./routes/PostRoutes");
const usersRouter = require("./routes/UserRoutes");
const loginRouter = require("./routes/LoginRoutes");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);
app.use("/api/posts", postRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
