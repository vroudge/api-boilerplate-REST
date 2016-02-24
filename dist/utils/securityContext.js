'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _roles = require('./roles');

var _roles2 = _interopRequireDefault(_roles);

var _error = require('./error');

var errors = _interopRequireWildcard(_error);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SecurityContext = (function () {
	function SecurityContext() {
		var user = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

		_classCallCheck(this, SecurityContext);

		this.user = user;
		this.roles = _roles2.default;
	}

	_createClass(SecurityContext, [{
		key: 'can',
		value: function can(permission) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			return this.roles.can(this, permission, args).then(function (result) {
				if (result === true) {
					return true;
				}
				if (result === null) {
					throw new errors.ServerError('No security rule matched for \'' + permission + '\', denying by default');
				}
				throw new errors.ForbiddenError(result || permission + ' denied!');
			});
		}

		// a simple alias of can

	}, {
		key: 'check',
		value: function check() {
			return this.can.apply(this, arguments);
		}
	}, {
		key: 'userHasRole',
		value: function userHasRole(roleOrRoles) {
			if (!_.isArray(roleOrRoles)) {
				roleOrRoles = [roleOrRoles];
			}
			return this.can('user has role', roleOrRoles);
		}
	}, {
		key: 'applicationHasRole',
		value: function applicationHasRole(roleOrRoles) {
			if (!_.isArray(roleOrRoles)) {
				roleOrRoles = [roleOrRoles];
			}
			return this.can('application has role', roleOrRoles);
		}
	}, {
		key: 'isApplicationOnly',
		value: function isApplicationOnly() {
			return this.application && this.application.hasWhiteRole() && !this.user;
		}
	}, {
		key: 'loggedIn',
		value: function loggedIn() {
			return this.application;
		}
	}]);

	return SecurityContext;
})();

exports.default = SecurityContext;
//# sourceMappingURL=securityContext.js.map