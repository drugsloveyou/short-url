const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoUri");

const connectMongo = async () => {
  try {
    
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected to: ${db}`);

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
