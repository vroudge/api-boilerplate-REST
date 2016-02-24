'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define the schema for our user model
var fileSchema = _mongoose2.default.Schema({
        pid: String,
        originalName: String,
        encoding: String,
        mimetype: String,
        size: Number,
        binary: Buffer,
        createdAt: Date
});

exports.default = _mongoose2.default.model('file', fileSchema);
//# sourceMappingURL=index.js.map