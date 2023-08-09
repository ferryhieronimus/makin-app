require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};
