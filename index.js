const config = require("config");
const app = require("./app");

const port = process.env.PORT || config.get("port");

app.listen(port, () => {
  console.log(`Server running on  http://localhost:${port}`);
});