'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileService = undefined;

var _BaseService2 = require('../BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _conf = require('../../conf');

var _conf2 = _interopRequireDefault(_conf);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _puid = require('puid');

var _puid2 = _interopRequireDefault(_puid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileService = (function (_BaseService) {
    _inherits(FileService, _BaseService);

    function FileService() {
        _classCallCheck(this, FileService);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FileService).apply(this, arguments));
    }

    _createClass(FileService, [{
        key: 'getFile',
        value: function getFile(pid) {
            return _models2.default.FileModel.findOne({ pid: pid });
        }

        /*
         getFile(pid, infos) {
          //Check infos
          //var arrayPart = [];
         //get all part files
         //for each
         //DECRYPT AES
         //Save in arrayPart
          //join all part files
          //Return
         }
         */

    }, {
        key: 'saveFile',
        value: function saveFile(file) {
            var puid = new _puid2.default();
            file.pid = puid.generate();

            //Check MD5

            //Split file
            //for each
            //CRYPT AES
            //Save Part document in database

            return new _models2.default.FileModel(file).save().then(function (savedFile) {
                return savedFile;
            });
        }
    }]);

    return FileService;
})(_BaseService3.default);

//singleton

var instance = new FileService();
exports.FileService = FileService;
exports.FileService = instance;
exports.default = instance;
//# sourceMappingURL=index.js.map