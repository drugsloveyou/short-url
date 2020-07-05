const epxress = require("express");
const router = epxress.Router();
const validUrl = require("valid-url");
const shortId = require("../utils/short-id");
const config = require("config");
const UrlModel = require("../models/shortId");
const md5 = require("../utils/md5");

//根据长链接获取短链接
router.get("/shortId", async function (req, res, next) {
  const { url } = req.query;
  if (validUrl.isUri(url)) {
    try {
      const md5Code = md5(url).toLocaleLowerCase();
      let urlModel = await UrlModel.findOne({ _id: md5Code });
      if (urlModel) {
        res.json({
          code: urlModel.code,
          shortId: `http://localhost:${config.get("port")}/${urlModel.code}`,
        });
      } else {
        const code = shortId.generate();
        urlModel = new UrlModel({
          _id: md5Code,
          url,
          code,
        });
        await urlModel.save();
        res.json({
          code,
          shortId: `http://localhost:${config.get("port")}/${code}`,
        });
      }
    } catch (error) {
      res.status(500).json("Server error => " + error.message);
    }
  } else {
    res.status(401).json("Invalid url");
  }
});

//根据短链接获取长链接
router.get("/shortId/:code", async function (req, res, next) {
  try {
    const code = req.params.code;
    const url = await UrlModel.findOne({ code });
    if (url) {
      res.json({
        url: `${url.url}`,
      });
    } else {
      res.status(404).json("");
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;
