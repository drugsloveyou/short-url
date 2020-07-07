const request = require("supertest");
const config = require("config");
const http = require("http");
const UrlModel = require("../../models/shortId");
const shortId = require("../../utils/short-id");
const app = require("../../app");
const logger = require("../../utils/logger");
const md5 = require("../../utils/md5");
const assert = require("assert");

const testUrl = "https://www.baidu.com/";

describe("test/api/short-id.test.js /api/url/:code 接口测试", async function () {
  var server;
  var md5Code = md5(testUrl);
  var code;
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
    it("存在传入短码 ", function (done) {
      new Promise(async (resolve, reject) => {
        let url = await UrlModel.findOne({ _id: md5Code });
        request(server)
          .get(`/api/url/${url.code}`)
          .expect(200, function (err, res) {
            if (err) {
              reject();
            } else {
              resolve();
            }
          });
      })
        .then(done)
        .catch(done);
    });

    it("不存在短码", function (done) {
      request(server)
        .get(`/api/url/${Math.random().toString(36).slice(2)}`)
        .expect(404, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });

  describe("参数类型不正常或不存在 404", function () {
    it("不传参数code", function (done) {
      request(server)
        .get(`/api/url/`)
        .expect(404, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    it("code传特殊字符串", function (done) {
      request(server)
        .get(`/api/url/$#%@*@)#^*#`)
        .expect(404, function (err, res) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    //  可以补充其他类型参数如特殊字符等等
  });

  describe("并发", function () {
    it("code参数为特殊字符并且数据库中不存在，并发1000次请求", async function () {
      const promises = [];
      for (let i = 0; i < 1000; i++) {
        promises.push(
          new Promise((resolve) => {
            request(server)
              .get(`/api/url/&*#（*&#（*@`)
              .expect(404, function (err, res) {
                if (err) {
                  resolve(0);
                } else {
                  resolve(1);
                }
              });
          })
        );
      }

      const results = await Promise.all(promises);
      const ok = results.some((item) => item);
      assert.ok(ok);
    });
  });

  //可以补充最大get参数长度的测试用例
});
