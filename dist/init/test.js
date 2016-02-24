'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _chaiProperties = require('chai-properties');

var _chaiProperties2 = _interopRequireDefault(_chaiProperties);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _index = require('../controllers/index');

var _index2 = _interopRequireDefault(_index);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _conf = require('../conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./globals');

//defines that we're running tests
process.env.NODE_ENV = 'test';

_chai2.default.use(_chaiAsPromised2.default);
_chai2.default.use(_chaiProperties2.default);

global.chai = _chai2.default;
global.expect = _chai2.default.expect;
global.Promise = require('bluebird');

var currentConf = _conf2.default[process.env.NODE_ENV];
_mongoose2.default.connect(currentConf.mongodb);

var router = require('../controllers').default;
var server = (0, _express2.default)();

server.use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: false })).use((0, _methodOverride2.default)());
server.use(router);

global.request = function (method, path) {
    var body = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var token = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    return (0, _supertest2.default)(server)[method](path);
    //if (token) {
    /*if (_.isString(token)) {
     req = req.set('Authorization', 'JWT ' + token);
     } else if (token instanceof models.Token.Instance) {
     let jwt = token.getEncryptedJwt(conf.jwtSecret);
     req = req.set('Authorization', 'JWT ' + jwt);
     } else {
     throw new Error('Token not supported', token);
     }*/
    //}
};
//# sourceMappingURL=test.js.map