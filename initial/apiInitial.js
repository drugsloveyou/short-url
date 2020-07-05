function apiIntial(app) {
  app.use("/", require("../api/index"));
  app.use("/api", require("../api/shortId"));
}

module.exports = apiIntial;
