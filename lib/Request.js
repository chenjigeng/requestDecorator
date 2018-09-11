'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
  function Request() {
    var maxLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

    _classCallCheck(this, Request);

    this.maxLimit = maxLimit;
    this.requestQueue = [];
    this.currentId = 0;
    this.currentConcurrent = 0;
  }

  _createClass(Request, [{
    key: 'request',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, params, _ref2) {
        var _ref2$retry = _ref2.retry,
            retry = _ref2$retry === undefined ? 1 : _ref2$retry;
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.currentConcurrent >= this.maxLimit)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.startBlocking();

              case 3:
                _context.prev = 3;

                this.currentConcurrent++;
                result = fetch(url, params);

                this.currentConcurrent--;
                this.next();
                return _context.abrupt('return', result);

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](3);
                return _context.abrupt('return', Promise.reject(_context.t0));

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 11]]);
      }));

      function request(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: 'startBlocking',
    value: function startBlocking() {
      var _resolve = void 0;
      var promise2 = new Promise(function (resolve, reject) {
        return _resolve = resolve;
      });
      this.requestQueue.push(promise2);
      return promise2;
    }
  }, {
    key: 'next',
    value: function next() {
      var _resolve = this.requestQueue.shift();
      _resolve();
    }
  }]);

  return Request;
}();

exports.default = Request;