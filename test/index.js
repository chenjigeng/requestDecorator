const RequestDecorator = require('../src/index.js')

// 一个callback类型的请求api
async function delay(num, time, cb) {
  setTimeout(() => {
    cb(null, num);
  }, time);
}

// 通过maxLimit设置并发量限制，needChange2Promise将callback类型的请求api转化为promise类型的。
const requestInstance = new RequestDecorator({
  maxLimit: 5,
  requestApi: delay,
  needChange2Promise: true,
});


let promises = [];
for (let i = 0; i < 30; i++) {
  // 接下来你就可以像原来使用你的api那样使用它,参数和原来的是一样的
  promises.push(requestInstance.request(i, Math.random() * 3000).then(result => console.log('result', result), error => console.log(error)));
}
async function test() {
  await Promise.all(promises);
}

test();

