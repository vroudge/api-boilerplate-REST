'use strict';

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('[SERVICES] - user', function () {
	describe('Create - ', function () {
		it('Creates a user without email', function () {
			return _user2.default.create('abcd1234').then(function (user) {
				expect(user.token).to.be.a('string');
				expect(user.uid).to.equal('abcd1234');
			});
		});
	});

	describe('Update - ', function () {
		it('Updates a user without email and adds email', function () {
			return _user2.default.create('abcd1234').then(function (user) {
				return _user2.default.update(user.uid, user.token, 'kek@lol.com');
			}).then(function (user) {
				expect(user.token).to.be.a('string');
				expect(user.email).to.be.a('string');
				expect(user.uid).to.be.a('string');
			});
		});
		it('Does not update user without email', function () {});
	});
});
//# sourceMappingURL=index.spec.js.map