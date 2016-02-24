'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _securityContext = require('../utils/securityContext');

var _securityContext2 = _interopRequireDefault(_securityContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseService = (function () {
	function BaseService(context) {
		_classCallCheck(this, BaseService);

		if (!context) {
			context = new _securityContext2.default();
		}
		this.context = context;
	}

	/**
  * Returns a new instance of this service
  */

	_createClass(BaseService, [{
		key: 'god',
		value: function god() {
			var sv = new this.constructor();
			return sv;
		}
	}]);

	return BaseService;
})();

exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map