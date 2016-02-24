'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define the schema for our user model
var documentSchema = _mongoose2.default.Schema({
		token: String,
		partsIds: [String],
		md5: String,
		size: Number,
		checkIdCardNeeded: Boolean,
		fileType: String,
		createdAt: Date
});

exports.default = _mongoose2.default.model('Document', documentSchema);
//# sourceMappingURL=index.js.map