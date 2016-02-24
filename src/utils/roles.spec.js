import { Roles } from './roles';

describe('[SecurityRoles]', function() {

	describe('no handler', function() {

		var roles = new Roles();

		it('should be null', function() {
			return expect(roles.can({}, 'any'))
				.to.eventually.be.null;
		});
	});

	describe('simple scenarios', function() {

		var roles;

		beforeEach(function() {
			roles = new Roles();
			roles.use('administrate', function() {
				return this.userRole === 'admin';
			});
		});

		it('should grant', function() {
			return expect(roles.can({ userRole: 'admin' }, 'administrate'))
				.to.eventually.be.true;
		});

		it('should deny', function() {
			return expect(roles.can({ userRole: 'plouc' }, 'administrate'))
				.to.eventually.be.false;
		});

		it('should be null if none matched', function() {
			return expect(roles.can({ userRole: 'plouc' }, 'unknown permission'))
				.to.eventually.be.null;
		});

		it('should work without context', function() {
			return expect(roles.can({}, 'unknown permission'))
				.to.eventually.be.null;
		});

		describe('with wildcard', function() {

			beforeEach(function() {
				roles.use(function() {
					return true;
				});
			});

			it('should grant', function() {
				return expect(roles.can({ userRole: 'admin' }, 'administrate'))
					.to.eventually.be.true;
			});

			it('should deny', function() {
				return expect(roles.can({ userRole: 'plouc' }, 'administrate'))
					.to.eventually.be.false;
			});

			it('should be false if none matched', function() {
				return expect(roles.can({ userRole: 'plouc' }, 'unknown permission'))
					.to.eventually.be.true;
			});
		});
	});

	describe('promised scenarios', function() {

		var roles;

		function getUser(userId) {
			return Promise.resolve({ userRole: 'admin' }).timeout(200);
		}

		beforeEach(function() {
			roles = new Roles();
			roles.use('administrate blog', function() {
				return getUser(this.userId)
					.then((u) => {
						return u.userRole === 'admin';
					});
			});
			roles.use('read article', function(article) {
				return !article.draft;
			});
		});

		it('should grant', function() {
			return expect(roles.can({ userId: 'test' }, 'administrate blog'))
				.to.eventually.be.true;
		});

		it('should deny reading draft article', function() {
			return expect(roles.can({ userId: 'test' }, 'read article', { draft: true }))
				.to.eventually.be.false;
		});

		it('should grant reading published article', function() {
			return expect(roles.can({ userId: 'test' }, 'read article', { draft: false }))
				.to.eventually.be.true;
		});

		it('should handle rejected handlers', function() {
			roles.use('reject', function() {
				return Promise.reject('bla');
			});
			return expect(roles.can({ userId: 'test' }, 'reject'))
				.to.eventually.be.rejected;
		});

	});
});
