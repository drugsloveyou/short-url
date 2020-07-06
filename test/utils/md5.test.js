const md5 = require("../../utils/md5");

describe('test/utils/md5.test.js', async function () {

  describe('字符串为空的情况', async function () {
    it('字符串为""', function () {
      md5('');
    });

    it('字符串为null', function () {
      md5(null);
    });

    it('字符串为undefined', function () {
      md5(undefined);
    });

    it('字符串为NaN', function () {
      md5(NaN);
    });
  });

  //TODO: 不为字符串类型时

  describe('str参数不为空', async function () {
    let str = Math.random().toString().slice(2);
    it('字符串为 ' + str, function () {
      md5(str);
    });
  });
});