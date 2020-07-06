const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoUri");

const connectMongo = async (uri) => {
  try {
    await mongoose.connect(uri || db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
