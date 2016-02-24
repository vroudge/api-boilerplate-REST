class ApiError extends Error {

	constructor(message, status, errors) {
		super();
		Error.captureStackTrace(this, this.constructor);
		Object.defineProperty(this, 'message', {
			value: message
		});
		this.errors = errors;
		this.status = status;
	}

	get type() {
		return this.constructor.name;
	}
}

export class BadRequestError extends ApiError {
	constructor(message = 'Bad API request', status = 400, errors = []) {
		super(message, status, errors);
	}
}

export class InvalidOldPasswordError extends BadRequestError {
	constructor(message = 'Old password does not match') {
		super(message);
	}
}

export class BadTokenError extends BadRequestError {
	constructor(message = 'Token already in use', errors = []) {
		super(message, 400, errors);
	}
}

export class ValidationError extends BadRequestError {
	constructor(message = 'Bad body format', errors = []) {
		super(message, 400, errors);
	}
}

export class NotFoundError extends ApiError {
	constructor(message = 'Not found', status = 404) {
		super(message, status);
	}
}

export class EndpointNotFoundError extends NotFoundError {
	constructor(path) {
		super(`${path} does not exist`);
	}
}

export class ResourceNotFoundError extends NotFoundError {
	constructor(resourceType, resourceId) {
		var message = `${resourceType} ${resourceId} not found`;
		super(message);
	}
}

export class ForbiddenError extends ApiError {
	constructor(message = 'Forbidden', status = 403) {
		super(message, status);
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message = 'Wrong credentials', status = 401) {
		super(message, status);
	}
}

export class ServerError extends ApiError {
	constructor(message = 'Unexpected server error', status = 500) {
		super(message, status);
	}
}

import PrettyError from 'pretty-error';

const pe = new PrettyError();

pe.appendStyle({
	'pretty-error > trace > item': {
		marginBottom: 0
	}
});
export function render(err) {
	return pe.render(err);
}

export function log(err) {
	console.log(pe.render(err));
}

export default {
	ApiError,
	NotFoundError,
	EndpointNotFoundError,
	ResourceNotFoundError,
	BadRequestError,
	InvalidOldPasswordError,
	ValidationError,
	ForbiddenError,
	UnauthorizedError,
	render,
	BadTokenError,
	log,
	ServerError
};
