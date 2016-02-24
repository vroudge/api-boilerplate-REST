import errors from './error';
var debug = require('debug')('amber');

export class Roles {

	constructor() {
		this.handlers = [];
	}

	registerHandler(fn) {
		this.handlers.push(fn);
	}

	use() {
		if (arguments.length === 1) {
			debug(`register wildcard handler (${ this.handlers.length })`);
			this.registerHandler(arguments[0]);
		} else if (arguments.length === 2) {
			var perm = arguments[0];
			var fn = arguments[1];
			debug(`register handler '${perm}' (${ this.handlers.length })`);
			this.registerHandler(function(permission, ...args) {
				if (permission === perm) {
					return fn.apply(this, args);
				}
				return null;
			});
		} else {
			throw new TypeError('use() expects one or two arguments');
		}
	}

	can(context, permission, args) {
		return this._testNextHandler(0, context, permission, args)
			.then((result) => {
				if (result === true) {
					debug(`${permission} granted`);
					return true;
				} else if (result === false) {
					debug(`${permission} denied: no reason`);
					return false;
				} else if (typeof result === 'string') {
					debug(`${permission} denied: ${result}`);
					return result;
				} else {
					debug(`${permission} did not match any rule`);
					return null;
				}
			}, (error) => {
				if (error instanceof errors.ApiError) {
					debug(`${permission} denieed: ${error.message} ${error.status}`);
				} else {
					debug(`${permission} handler err'ed: ${error.message}`);
				}
				throw error;
			});
	}

	_testNextHandler(handlerIndex, context, permission, args) {
		var handler = this.handlers[handlerIndex];
		if (!handler) {
			return Promise.resolve(null)
		};
		var result = handler.apply(context, [ permission ].concat(args));
		if (!Promise.isPromise(result)) {
			result = Promise.resolve(result);
		}
		return result
			.then((r) => {
				// pass on to next
				if (r === null || r === undefined) {
					let length = this.handlers.length;
					if (handlerIndex < length - 1) {
						return this._testNextHandler(handlerIndex + 1, context, permission, args);
					} else {
						return null;
					}
				}
				// if boolean or string skip remaining handlers
				return r;
			});
	}
}

export { Roles as SecurityRoles };
export default new Roles();
