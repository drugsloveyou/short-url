var assert = require("assert");
const request = require("supertest");
const config = require("config");

const app = require("../app");
const logger = require("../utils/logger");
const md5 = require("../utils/md5");
const shortId = require("../utils/short-id");

describe("#test utils", async function () {
  before(function () {});

  after(function () {});

  beforeEach(function () {});

  afterEach(async function () {});

  it("#test md5", async function (done) {
    md5("https://www.baidu.com/");
    assert.ok(true);
    done();
  });

  it("#test shortId", function (done) {
    const sid = shortId.generate();
    logger.debug(sid);
    assert.ok(true);
    done();
  });

  it("#test index.js", function (done) {
    require("../index");
    assert.ok(true);
    done();
  });
});
