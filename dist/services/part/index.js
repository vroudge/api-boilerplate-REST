'use strict';

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadService = (function (_BaseService) {
  _inherits(UploadService, _BaseService);

  function UploadService() {
    _classCallCheck(this, UploadService);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UploadService).apply(this, arguments));
  }

  return UploadService;
})(_BaseService3.default);
//# sourceMappingURL=index.js.map