const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  _id: String, //url的md5加密
  url: String, //原长链接
  code: String, //短链id
});

module.exports = mongoose.model("Url", urlSchema);
