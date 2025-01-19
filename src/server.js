const mongoose = require("mongoose");
const config = require("./app/config/config");
const app = require("./app");
let server;
async function main() {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to MongoDB");
    server = app.listen(config.PORT, async () => {
      console.log(`Server is listening on port :${config.PORT}`);
    });
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
}
main();
process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
