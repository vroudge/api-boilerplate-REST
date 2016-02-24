'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _conf = require('../conf');

var _conf2 = _interopRequireDefault(_conf);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _flash = require('flash');

var _flash2 = _interopRequireDefault(_flash);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require('babel-core/register')({
    retainLines: true
});

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}

///////////////////////////////////////////////////////////////////////////// GLOBAL VARS

require('./globals');

var currentConf = _conf2.default[process.env.NODE_ENV];
_mongoose2.default.connect(currentConf.mongodb);

var server = (0, _express2.default)();

server.set('port', currentConf.port);
server.set('debug', true);

server.use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: false })).use((0, _methodOverride2.default)());

/*server.use(session({secret: currentConf.secretJWT})); // session secret
 server.use(passport.initialize());
 server.use(passport.session()); // persistent login sessions
 server.use(flash()); // use connect-flash for flash messages stored in session*/

server.use(_controllers2.default);

server.start = function () {
    return Promise.fromNode(function (callback) {
        _http2.default.createServer(server).listen(server.get('port'), callback);
    }).tap(function () {
        console.log('Running on ' + process.env.NODE_ENV + ' on ' + server.get('port'));
    });
};

exports.default = server;
//# sourceMappingURL=index.js.map