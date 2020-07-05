const express = require("express");
const initial = require("./initial");

const app = express();

app.use(
  express.json({
    extended: false,
  })
);

//项目初始化相关（sql相关等）
initial(app);

module.exports = app;