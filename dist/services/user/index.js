'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserService = undefined;

var _BaseService2 = require('../BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _conf = require('../../conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserService = (function (_BaseService) {
    _inherits(UserService, _BaseService);

    function UserService() {
        _classCallCheck(this, UserService);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UserService).apply(this, arguments));
    }

    _createClass(UserService, [{
        key: 'create',
        value: function create(uid) {
            var token = _jsonwebtoken2.default.sign(uid, _conf2.default[process.env.NODE_ENV].secretJWT);
            return new _models2.default.UserModel({ uid: uid, token: token }).save();
        }
    }, {
        key: 'update',
        value: function update(uid, token, email) {
            return _models2.default.UserModel.findOne({ uid: uid, token: token }).then(function (user) {
                user.email = email;
                return user.save();
            });
        }
    }]);

    return UserService;
})(_BaseService3.default);

//singleton

var instance = new UserService();
exports.UserService = UserService;
exports.UserService = instance;
exports.default = instance;
//# sourceMappingURL=index.js.map