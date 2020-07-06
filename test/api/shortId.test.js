const request = require("supertest");
const config = require("config");
const UrlModel = require("../../models/shortId");

const app = require("../../app");
const logger = require("../../utils/logger");
const md5 = require("../../utils/md5");

const testUrl = "https://www.baidu.com/";

describe("#test express app /api/shortId/*", async function () {
  //http测试
  let server;
  let code;
  const port = config.get("port");

  before(function () {
    //执行测试用例前开启服务器
    server = app.listen(port);
  });

  after(function () {
    //执行完后关闭服务器监听
    server.close();
  });

  beforeEach(function () { });

  afterEach(async function () {
    if (!code) {
      const md5Code = md5(testUrl).toLocaleLowerCase();
      let urlModel = await UrlModel.findOne({ _id: md5Code });
      code = urlModel.code;
    }
  });

  it(
    "#test get /api/shortId/?url=" +
    testUrl +
    "?q=" +
    Math.random().toString(36).slice(2),
    function (done) {
      request(server)
        .get(`/api/shortId/`)
        .query({
          url: testUrl + "?q=" + Math.random().toString(36).slice(2),
        })
        .expect(200, function (err, res) {
          if (err) {
            logger.debug(err);
            done(err);
          } else {
            code = res.body.code;
            done();
          }
        });
    }
  );

  it("#test get /api/shortId/?url=" + testUrl, function (done) {
    request(server)
      .get(`/api/shortId/`)
      .query({
        url: testUrl,
      })
      .expect(200, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          code = res.body.code;
          done();
        }
      });
  });

  it("#test get /api/shortId/?url=1", function (done) {
    request(server)
      .get(`/api/shortId/`)
      .query({
        url: "1",
      })
      .expect(401, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          code = res.body.code;
          done();
        }
      });
  });

  it("#test get /api/shortId/:code", function (done) {
    request(server)
      .get(`/api/shortId/${code}`)
      .expect(200, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          done();
        }
      });
  });


  it("#test get /api/shortId/:code", function (done) {
    request(server)
      .get(`/api/shortId/989988998`)
      .expect(404, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          done();
        }
      });
  });

  it("#test get /:code", function (done) {
    request(server)
      .get(`/${code}`)
      .expect(301, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          done();
        }
      });
  });

  it("#test get /:1232130", function (done) {
    request(server)
      .get(`/$1232130`)
      .expect(404, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          done();
        }
      });
  });
});
