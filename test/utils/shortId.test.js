const shortId = require("../../utils/short-id");
const assert = require('assert');

describe('test/utils/shortId.test.js', async function () {

  it('生成shortId', function () {
    shortId.generate();
  });

  it('重复10000次不会重复', function (done) {
    var ids = {};
    var id;

    var i = 10000;
    while (i--) {
      id = shortId.generate();
      assert(id.length <= 8);
      ids[id] = ids[id] ? ids[id]++ : 1;
      assert.equal(ids[id], 1);
    }

    done();
  });
});