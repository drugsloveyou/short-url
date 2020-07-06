const epxress = require("express");
const router = epxress.Router();
const UrlModel = require("../models/shortId");

router.get("/:code", async (req, res, next) => {
  try {
    const code = req.params.code;
    const url = await UrlModel.findOne({ _id: code });
    if (url) {
      res.redirect(301, url.url);
    } else {
      res.status(404).json("");
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;
