'use strict';

var _securityContext = require('./securityContext');

var _securityContext2 = _interopRequireDefault(_securityContext);

var _Roles = require('./Roles');

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('[SecurityContext]', function () {

	var context;

	beforeEach(function () {
		context = new _securityContext2.default({ role: 'god', gender: 'boy' });

		context.roles = new _Roles.SecurityRoles();
		context.roles.use('view girl content', function () {
			return this.user && this.user.gender === 'girl';
		});
		context.roles.use('view boy content', function () {
			return this.user && this.user.gender === 'boy';
		});
		context.roles.use('reject', function () {
			throw new _error2.default.BadRequestError('bla');
		});
	});

	it('should grant', function () {
		return expect(context.can('view boy content')).to.eventually.be.true;
	});

	it('should deny', function () {
		return expect(context.can('view girl content')).to.eventually.be.rejected;
	});

	it('should deny by default', function () {
		return expect(context.can('administrate')).to.eventually.be.rejected;
	});

	it('should forward rejections', function () {
		return expect(context.can('reject')).to.eventually.be.rejected;
	});
});
//# sourceMappingURL=securityContext.spec.js.map