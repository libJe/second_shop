const configs = require("./configs");
const app = require("./app");
const DB = require("./database");

const startServer = async function () {
  // Ensure that the database is initialized
  await DB.connect();

  // Create a server instance
  const server = app.listen(configs.PORT, () => {
    console.log("Server is listening on port " + configs.PORT);
  });
};

startServer().catch((e) => {
  console.error(e);
  process.exit(1);
});