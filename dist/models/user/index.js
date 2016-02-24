'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define the schema for our user model
var userSchema = _mongoose2.default.Schema({
	token: String,
	uid: String,
	email: String,
	ipAdress: String,
	firstName: String,
	lastName: String,
	idCard: Buffer,
	phone: String,
	pgpPrivate: String,
	pgpPublic: String,
	createdAt: Date
});

exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=index.js.map