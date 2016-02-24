'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _error = require('../utils/error');

var _error2 = _interopRequireDefault(_error);

var _passport = require('passport');

var passport = _interopRequireWildcard(_passport);

var _middlewares = require('./middlewares');

var middlewares = _interopRequireWildcard(_middlewares);

var _noAuth = require('./no-auth');

var _noAuth2 = _interopRequireDefault(_noAuth);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _conf = require('../conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

router.use(middlewares.rest);
router.use(middlewares.securityHeaders);

middlewares.useCors(router);

/**********/

//HANDSHAKE
/**********/
router.get('/', function (req, res, next) {
	res.shoot({
		API: 'AmberFS-API',
		Version: '0.0.1',
		Description: 'Encryption manager for AmberFS'
	});
});

//PUBLIC
/*******/
router.use('/', _noAuth2.default);

//PRIVATE
/********/
router.use('/auth', _auth2.default);

//#############################################
// ERRORS HANDLING
//#############################################

// no route matched so far so
// catch 404 and forward to error handler
router.use(function (req, res, next) {
	next(new _error2.default.EndpointNotFoundError(req.path));
});

// error generic handler
router.use(middlewares.error);

exports.default = router;
//# sourceMappingURL=index.js.map