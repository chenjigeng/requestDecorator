const RequestDecorator = require('../src/index.js')

async function delay(num, time, cb) {
  setTimeout(() => {
    cb(null, num);
  }, time);
}
const requestInstance = new RequestDecorator({
  maxLimit: 5,
  requestApi: delay,
  needChange2Promise: true,
});


let promises = [];
for (let i = 0; i < 30; i++) {
  promises.push(requestInstance.request(i, Math.random() * 3000).then(result => console.log('result', result), error => console.log(error)));
}
async function test() {
  await Promise.all(promises);
}

test();

