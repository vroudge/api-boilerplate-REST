import SecurityContext from './securityContext';
import { SecurityRoles } from './Roles';

import error from './error';

describe('[SecurityContext]', function() {

	var context;

	beforeEach(function() {
		context = new SecurityContext({role: 'god', gender: 'boy'});

		context.roles = new SecurityRoles();
		context.roles.use('view girl content', function() {
			return this.user && this.user.gender === 'girl';
		});
		context.roles.use('view boy content', function() {
			return this.user && this.user.gender === 'boy';
		});
		context.roles.use('reject', function() {
			throw new error.BadRequestError('bla');
		});
	});

	it('should grant', function() {
		return expect(context.can('view boy content'))
			.to.eventually.be.true;
	});

	it('should deny', function() {
		return expect(context.can('view girl content'))
			.to.eventually.be.rejected;
	});

	it('should deny by default', function() {
		return expect(context.can('administrate'))
			.to.eventually.be.rejected;
	});

	it('should forward rejections', function() {
		return expect(context.can('reject'))
			.to.eventually.be.rejected;
	});
});
