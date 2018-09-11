const Request = require('./Request');
const request = require('request');

async function delay(num, time, cb) {
  setTimeout(() => {
    cb(null, num);    
  }, time);
}
const requestInstance = new Request({
  maxLimit: 5,
  requestApi: delay,
  needChange2Promise: true,
});


let promises = [];
for (let i = 0; i < 30; i++) {
  promises.push(requestInstance.request(i, Math.random() * 3000));
}
async function test() {
  await Promise.all(promises);
}

test();

