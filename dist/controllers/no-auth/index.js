'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

var _user = require('../../services/user');

var _user2 = _interopRequireDefault(_user);

var _file = require('../../services/file');

var _file2 = _interopRequireDefault(_file);

var _conf = require('../../conf');

var _conf2 = _interopRequireDefault(_conf);

var _serializers = require('../serializers');

var _serializers2 = _interopRequireDefault(_serializers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)({ dest: 'uploads/' });

var router = new _express2.default.Router();

/* ROUTES */

router.route('/user').post(requestToken);

router.route('/file').get(getFile).post(upload.single('file'), sendFile);

/* METHODS */

function requestToken(req, res, next) {
    if (!req.body.uid) {
        throw new _error2.default.BadRequestError('No uid provided for creation');
    }

    _user2.default.create(req.body.uid).then(function (createdToken) {
        return res.shoot(createdToken, _serializers2.default.userCreation);
    });
}

function sendFile(req, res) {
    /*if (!req.body.uid) {
     throw new error.BadRequestError('No uid provided for creation');
     }*/

    return _file2.default.saveFile(req.file).then(function (pidDocument) {
        return res.shoot(pidDocument, ['pid']);
    });
}

function getFile(req, res) {
    /*if (!req.body.uid) {
     throw new error.BadRequestError('No uid provided for creation');
     }*/

    console.log('getFile');

    if (!req.query.pid) {
        throw new _error2.default.BadRequestError('No PID provided for file');
    }

    return _file2.default.getFile(req.query.pid).then(function (file) {
        console.log(file);
        res.shoot(file);
    });
}

exports.default = router;
//# sourceMappingURL=index.js.map