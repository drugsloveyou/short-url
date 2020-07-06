const request = require("supertest");
const config = require("config");
const http = require('http');
const UrlModel = require('../../models/shortId');
const shortId = require("../../utils/short-id");
const app = require("../../app");
const logger = require("../../utils/logger");
const md5 = require("../../utils/md5");

const testUrl = "https://www.baidu.com/";

describe('test/api/index.test.js 测试接口/index', async () => {
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

  it('不传短码param /', function (done) {
    request(server)
      .get('/')
      .expect(404, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          done();
        }
      });
  });

  it('不存在这个短码 /123456789', function (done) {
    request(server)
      .get(`/123456789`)
      .expect(404, function (err, res) {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          done();
        }
      });
  });

  it('存在这个短码', function (done) {
    new Promise(async (resolve, reject) => {
      let url = await UrlModel.findOne({ _id: md5Code });
      request(server)
        .get(`/${url.code}`)
        .expect(301, function (err, res) {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
    }).then(done).catch(done);
  });

});