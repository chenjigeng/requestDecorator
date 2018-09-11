const pify = require('pify');

class RequestDecorator {
  constructor ({
    maxLimit = 5,
    requestApi,
    needChange2Promise,
  }) {
    this.maxLimit = maxLimit;
    this.requestQueue = [];
    this.currentId = 0;
    this.currentConcurrent = 0;
    this.requestApi = needChange2Promise ? pify(requestApi) : requestApi;
  }

  async request(...args) {
    if (this.currentConcurrent >= this.maxLimit) {
      await this.startBlocking();
    }
    try {
      this.currentConcurrent++;      
      const result = await this.requestApi(...args);
      this.currentConcurrent--;
      this.next();
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  startBlocking() {
    let _resolve;
    let promise2 = new Promise((resolve, reject) => _resolve = resolve);
    this.requestQueue.push(_resolve);
    return promise2;
  }

  next() {
    if (this.requestQueue.length <= 0) return;
    const _resolve = this.requestQueue.shift();
    _resolve();
  }
}

module.exports = RequestDecorator;