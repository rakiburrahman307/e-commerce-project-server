const mongoose = require("mongoose");
const config = require("./app/config/config");
const app = require("./app");

async function main() {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to MongoDB");
    app.listen(config.PORT, async () => {
      console.log(`Server is listening on port :${config.PORT}`);
    });
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
}
main()