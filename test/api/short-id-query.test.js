const request = require("supertest");
const config = require("config");
const http = require("http");
const UrlModel = require("../../models/shortId");
const shortId = require("../../utils/short-id");
const app = require("../../app");
const logger = require("../../utils/logger");
const md5 = require("../../utils/md5");

const testUrl = "https://www.baidu.com/";

describe("test/api/short-id-query.test.js /api/shortId?url=${url} 接口测试", async function () {
  var server;
  var md5Code = md5(testUrl);
  before(async () => {
    let url = await UrlModel.findOne({ _id: md5Code });
    if (!url)
      await new UrlModel({
        _id: md5Code,
        url: testUrl,
        code: shortId.generate(),
      }).save();
    server = app.listen(8080);
  });

  after(() => {
    server.close();
  });

  describe("参数类型正常", function () {
    it("存在该长链接", function (done) {
      request(server)
        .get(`/api/shortId`)
        .query({ url: testUrl })
        .expect(200, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    it("不存该长链接", function (done) {
      let url = testUrl + "?q=" + Math.random().toString(36).slice(2);
      request(server)
        .get(`/api/shortId`)
        .query({ url })
        .expect(200, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });

  describe("参数类型不正常或不存在", function () {
    it("参数类型不是链接", function (done) {
      request(server)
        .get(`/api/shortId`)
        .query({ url: "1" })
        .expect(401, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    it("不传参数url", function (done) {
      request(server)
        .get(`/api/shortId`)
        .expect(401, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });


    //  可以补充其他类型参数如特殊字符等等
  });

  //可以补充最大get参数长度的测试用例
});
