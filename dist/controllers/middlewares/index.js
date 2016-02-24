'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rest = rest;
exports.sendError = sendError;
exports.error = error;
exports.securityHeaders = securityHeaders;
exports.useCors = useCors;
exports.checkToken = checkToken;

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

var _conf = require('../../conf');

var _conf2 = _interopRequireDefault(_conf);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * JSON Formatter
 * @param req
 * @param res
 * @param next
 */
function rest(req, res, next) {
	res.shoot = function (dataOrPromise, serialize) {
		(Promise.isPromise(dataOrPromise) ? dataOrPromise : Promise.resolve(dataOrPromise)).then(function (data) {
			var serialized = data;
			if (serialize) {
				serialized = _.pick(data, serialize);
			}

			res.json(serialized);
		}).catch(function (err) {
			sendError(req, res, err);
		});
	};

	next();
}

/**
 * Sends error correctly from API
 * @param req
 * @param res
 * @param err
 */
function sendError(req, res, err) {
	err.status = err.status || 500;
	var data = {
		message: err.message,
		type: err.status < 500 && err.type ? err.type : 'ServerError',
		errors: err.errors ? err.errors : undefined
	};

	res.status(err.status);
	res.json(data);
}

function error(err, req, res, next) {
	//console.log(err.stack);
	sendError(req, res, err);
}

/**
 * Security headers checker/little hack for security
 * @param req
 * @param res
 * @param next
 */
function securityHeaders(req, res, next) {
	//remove default nginx and express headers
	res.removeHeader('X-Powered-By');
	res.removeHeader('Server');

	//keeps MIME type sniffing away
	res.header('X-Content-Type-Options', 'nosniff');

	//keeps iframe hijacking away
	res.header('X-Frame-Options', 'DENY');

	//prevents execution of downloads in our context, small IE bug, better safe than sorry
	res.setHeader('X-Download-Options', 'noopen');

	//forces HTTPS use
	if (process.env.NODE_ENV === 'prod') res.setHeader('Strict-Transport-Security', 'max-age=7776000000');

	//keeps xss attacks away
	var matches = /msie\s*(\d+)/i.exec(req.headers['user-agent']),
	    value;

	if (!matches || parseFloat(matches[1]) >= 9) {
		value = '1; mode=block';
	} else {
		value = '0';
	}

	res.setHeader('X-XSS-Protection', value);

	next();
}

/**
 * adds cors wildcard to router
 * @param router
 */
function useCors(router) {
	router.use((0, _cors2.default)());
	router.options('*', (0, _cors2.default)());
}

/**
 * checks for token validity
 * @param req
 * @param res
 * @param next
 */
function checkToken(req, res, next) {
	console.log("passsssss");
	var token = req.body.token || req.query.token || req.headers['X-Auth-Token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		_jsonwebtoken2.default.verify(token, _conf2.default[process.env.NODE_ENV].secretJWT, function (err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decodedToken = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		throw new _error2.default.ForbiddenError('Missing auth token');
	}

	next();
}
//# sourceMappingURL=index.js.map