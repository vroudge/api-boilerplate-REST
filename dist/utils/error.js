'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ServerError = exports.UnauthorizedError = exports.ForbiddenError = exports.ResourceNotFoundError = exports.EndpointNotFoundError = exports.NotFoundError = exports.ValidationError = exports.BadTokenError = exports.InvalidOldPasswordError = exports.BadRequestError = undefined;
exports.render = render;
exports.log = log;

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiError = (function (_Error) {
	_inherits(ApiError, _Error);

	function ApiError(message, status, errors) {
		_classCallCheck(this, ApiError);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApiError).call(this));

		Error.captureStackTrace(_this, _this.constructor);
		Object.defineProperty(_this, 'message', {
			value: message
		});
		_this.errors = errors;
		_this.status = status;
		return _this;
	}

	_createClass(ApiError, [{
		key: 'type',
		get: function get() {
			return this.constructor.name;
		}
	}]);

	return ApiError;
})(Error);

var BadRequestError = exports.BadRequestError = (function (_ApiError) {
	_inherits(BadRequestError, _ApiError);

	function BadRequestError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Bad API request' : arguments[0];
		var status = arguments.length <= 1 || arguments[1] === undefined ? 400 : arguments[1];
		var errors = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

		_classCallCheck(this, BadRequestError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BadRequestError).call(this, message, status, errors));
	}

	return BadRequestError;
})(ApiError);

var InvalidOldPasswordError = exports.InvalidOldPasswordError = (function (_BadRequestError) {
	_inherits(InvalidOldPasswordError, _BadRequestError);

	function InvalidOldPasswordError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Old password does not match' : arguments[0];

		_classCallCheck(this, InvalidOldPasswordError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(InvalidOldPasswordError).call(this, message));
	}

	return InvalidOldPasswordError;
})(BadRequestError);

var BadTokenError = exports.BadTokenError = (function (_BadRequestError2) {
	_inherits(BadTokenError, _BadRequestError2);

	function BadTokenError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Token already in use' : arguments[0];
		var errors = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		_classCallCheck(this, BadTokenError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BadTokenError).call(this, message, 400, errors));
	}

	return BadTokenError;
})(BadRequestError);

var ValidationError = exports.ValidationError = (function (_BadRequestError3) {
	_inherits(ValidationError, _BadRequestError3);

	function ValidationError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Bad body format' : arguments[0];
		var errors = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

		_classCallCheck(this, ValidationError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ValidationError).call(this, message, 400, errors));
	}

	return ValidationError;
})(BadRequestError);

var NotFoundError = exports.NotFoundError = (function (_ApiError2) {
	_inherits(NotFoundError, _ApiError2);

	function NotFoundError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Not found' : arguments[0];
		var status = arguments.length <= 1 || arguments[1] === undefined ? 404 : arguments[1];

		_classCallCheck(this, NotFoundError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFoundError).call(this, message, status));
	}

	return NotFoundError;
})(ApiError);

var EndpointNotFoundError = exports.EndpointNotFoundError = (function (_NotFoundError) {
	_inherits(EndpointNotFoundError, _NotFoundError);

	function EndpointNotFoundError(path) {
		_classCallCheck(this, EndpointNotFoundError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(EndpointNotFoundError).call(this, path + ' does not exist'));
	}

	return EndpointNotFoundError;
})(NotFoundError);

var ResourceNotFoundError = exports.ResourceNotFoundError = (function (_NotFoundError2) {
	_inherits(ResourceNotFoundError, _NotFoundError2);

	function ResourceNotFoundError(resourceType, resourceId) {
		_classCallCheck(this, ResourceNotFoundError);

		var message = resourceType + ' ' + resourceId + ' not found';
		return _possibleConstructorReturn(this, Object.getPrototypeOf(ResourceNotFoundError).call(this, message));
	}

	return ResourceNotFoundError;
})(NotFoundError);

var ForbiddenError = exports.ForbiddenError = (function (_ApiError3) {
	_inherits(ForbiddenError, _ApiError3);

	function ForbiddenError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Forbidden' : arguments[0];
		var status = arguments.length <= 1 || arguments[1] === undefined ? 403 : arguments[1];

		_classCallCheck(this, ForbiddenError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ForbiddenError).call(this, message, status));
	}

	return ForbiddenError;
})(ApiError);

var UnauthorizedError = exports.UnauthorizedError = (function (_ApiError4) {
	_inherits(UnauthorizedError, _ApiError4);

	function UnauthorizedError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Wrong credentials' : arguments[0];
		var status = arguments.length <= 1 || arguments[1] === undefined ? 401 : arguments[1];

		_classCallCheck(this, UnauthorizedError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(UnauthorizedError).call(this, message, status));
	}

	return UnauthorizedError;
})(ApiError);

var ServerError = exports.ServerError = (function (_ApiError5) {
	_inherits(ServerError, _ApiError5);

	function ServerError() {
		var message = arguments.length <= 0 || arguments[0] === undefined ? 'Unexpected server error' : arguments[0];
		var status = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];

		_classCallCheck(this, ServerError);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).call(this, message, status));
	}

	return ServerError;
})(ApiError);

var pe = new _prettyError2.default();

pe.appendStyle({
	'pretty-error > trace > item': {
		marginBottom: 0
	}
});
function render(err) {
	return pe.render(err);
}

function log(err) {
	console.log(pe.render(err));
}

exports.default = {
	ApiError: ApiError,
	NotFoundError: NotFoundError,
	EndpointNotFoundError: EndpointNotFoundError,
	ResourceNotFoundError: ResourceNotFoundError,
	BadRequestError: BadRequestError,
	InvalidOldPasswordError: InvalidOldPasswordError,
	ValidationError: ValidationError,
	ForbiddenError: ForbiddenError,
	UnauthorizedError: UnauthorizedError,
	render: render,
	BadTokenError: BadTokenError,
	log: log,
	ServerError: ServerError
};
//# sourceMappingURL=error.js.map