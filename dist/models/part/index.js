'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define the schema for our user model
var partSchema = _mongoose2.default.Schema({
		partNumber: Number,
		AESSalt: String,
		AESPepper: String,
		md5: String,
		pathURL: String,
		size: Number,
		createdAt: Date
});

exports.default = _mongoose2.default.model('part', partSchema);
//# sourceMappingURL=index.js.map