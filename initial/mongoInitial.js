const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoUri");

const connectMongo = async (uri) => {
  await mongoose.connect(uri || db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongo;
