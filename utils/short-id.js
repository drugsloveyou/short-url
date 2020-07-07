const clusterWorkerId = require("./cluster-work-id") || 0;

const chars = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ".split(
  ""
);
const REDUCE_TIME = 1593959151320;
let counter = 0;
let previousSeconds = 0;

function generate() {
  let shortId = "";
  //不然code太长，左右减去一个固定的时间，这里是写程序的时间
  let seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
  if (seconds === previousSeconds) {
    counter = Math.floor(Math.random() * chars.length);
  } else {
    counter = 0;
    previousSeconds = seconds;
  }
  // 不同进程的进程id
  shortId += transfrom(clusterWorkerId);
  // 如果时间相同则增加一个counter
  if (counter > 0) {
    shortId += transfrom(counter);
  }
  // 设置秒数转换
  shortId += transfrom(seconds);
  //这里可以屏蔽，最初好运行基本上只有三位数
  if (shortId.length < 6) {
    shortId += Math.random()
      .toString(36)
      .slice(2)
      .slice(0, 6 - shortId.length);
  }
  return shortId;
}

// 转字符串
function transfrom(number) {
  let radix = chars.length;
  let shortIds = [];
  let mod;

  do {
    mod = number % radix;
    number = (number - mod) / radix;
    shortIds.unshift(chars[mod]);
  } while (number);

  return shortIds.join("");
}

module.exports = {
  generate: generate,
};
