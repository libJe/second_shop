const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, ".env.dev") });
} else {
  dotenv.config({ path: path.resolve(__dirname, ".env.prod") });
}
module.exports = {
  DATABASE_URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cambosecondshop.tymtlgl.mongodb.net/?retryWrites=true&w=majority`,
  PORT: process.env.PORT || 6000,
  TELEGRAM_BOT_API: process.env.TELEGRAM_BOT_API,
};
