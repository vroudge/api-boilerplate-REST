'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SecurityRoles = exports.Roles = undefined;

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('amber');

var Roles = exports.Roles = (function () {
	function Roles() {
		_classCallCheck(this, Roles);

		this.handlers = [];
	}

	_createClass(Roles, [{
		key: 'registerHandler',
		value: function registerHandler(fn) {
			this.handlers.push(fn);
		}
	}, {
		key: 'use',
		value: function use() {
			if (arguments.length === 1) {
				debug('register wildcard handler (' + this.handlers.length + ')');
				this.registerHandler(arguments[0]);
			} else if (arguments.length === 2) {
				var perm = arguments[0];
				var fn = arguments[1];
				debug('register handler \'' + perm + '\' (' + this.handlers.length + ')');
				this.registerHandler(function (permission) {
					if (permission === perm) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}

						return fn.apply(this, args);
					}
					return null;
				});
			} else {
				throw new TypeError('use() expects one or two arguments');
			}
		}
	}, {
		key: 'can',
		value: function can(context, permission, args) {
			return this._testNextHandler(0, context, permission, args).then(function (result) {
				if (result === true) {
					debug(permission + ' granted');
					return true;
				} else if (result === false) {
					debug(permission + ' denied: no reason');
					return false;
				} else if (typeof result === 'string') {
					debug(permission + ' denied: ' + result);
					return result;
				} else {
					debug(permission + ' did not match any rule');
					return null;
				}
			}, function (error) {
				if (error instanceof _error2.default.ApiError) {
					debug(permission + ' denieed: ' + error.message + ' ' + error.status);
				} else {
					debug(permission + ' handler err\'ed: ' + error.message);
				}
				throw error;
			});
		}
	}, {
		key: '_testNextHandler',
		value: function _testNextHandler(handlerIndex, context, permission, args) {
			var _this = this;

			var handler = this.handlers[handlerIndex];
			if (!handler) {
				return Promise.resolve(null);
			};
			var result = handler.apply(context, [permission].concat(args));
			if (!Promise.isPromise(result)) {
				result = Promise.resolve(result);
			}
			return result.then(function (r) {
				// pass on to next
				if (r === null || r === undefined) {
					var length = _this.handlers.length;
					if (handlerIndex < length - 1) {
						return _this._testNextHandler(handlerIndex + 1, context, permission, args);
					} else {
						return null;
					}
				}
				// if boolean or string skip remaining handlers
				return r;
			});
		}
	}]);

	return Roles;
})();

exports.SecurityRoles = Roles;
exports.default = new Roles();
//# sourceMappingURL=roles.js.map