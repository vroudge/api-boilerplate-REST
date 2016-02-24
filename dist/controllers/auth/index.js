'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../middlewares');

var middlewares = _interopRequireWildcard(_middlewares);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('../../services/user');

var _user2 = _interopRequireDefault(_user);

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

/* ROUTES */

router.route('/user', middlewares.checkToken).put(addEmailToUser);

/* METHODS */

function addEmailToUser(req, res, next) {
    if (!req.body.uid) {
        next(new _error2.default.ForbiddenError('No UID provided'));
    }

    if (!req.body.email) {
        next(new _error2.default.ForbiddenError('No email provided'));
    }

    return _user2.default.update(req.body.uid, req.body.token, req.body.email).then(function (updatedUser) {
        res.shoot(updatedUser);
    });
}

exports.default = router;
//# sourceMappingURL=index.js.map