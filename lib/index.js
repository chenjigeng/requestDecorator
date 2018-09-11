'use strict';

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestInstance = new _Request2.default(5);

requestInstance.request('www.baidu.com');