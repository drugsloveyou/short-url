const crypto = require("crypto");

function md5(str) {
  str = str || "";
  const md5Hash = crypto.createHash("md5");
  md5Hash.update(str, "utf8");
  return md5Hash.digest("hex").toUpperCase();
}

module.exports = md5;
