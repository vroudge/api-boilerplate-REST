import roles from './roles';
import * as errors from './error';

export default class SecurityContext {

	constructor(user = null) {
		this.user = user;
		this.roles = roles;
	}

	can(permission, ...args) {
		return this.roles.can(this, permission, args)
			.then((result) => {
				if(result === true) {
					return true;
				}
				if(result === null) {
					throw new errors.ServerError(`No security rule matched for '${permission}', denying by default`);
				}
				throw new errors.ForbiddenError(result || `${permission} denied!`);
			});
	}

	// a simple alias of can
	check() {
		return this.can.apply(this, arguments);
	}

	userHasRole(roleOrRoles) {
		if(!_.isArray(roleOrRoles)) {
			roleOrRoles = [roleOrRoles];
		}
		return this.can('user has role', roleOrRoles);
	}

	applicationHasRole(roleOrRoles) {
		if(!_.isArray(roleOrRoles)) {
			roleOrRoles = [roleOrRoles];
		}
		return this.can('application has role', roleOrRoles);
	}

	isApplicationOnly() {
		return this.application && this.application.hasWhiteRole() && !this.user;
	}

	loggedIn() {
		return this.application;
	}
}
