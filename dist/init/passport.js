'use strict';

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStrategy = _passportLocal2.default.Strategy;

// load up the token model
// config/passport.js

// load all the things we need

// expose this function to our app using module.exports
module.exports = function (passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize tokens out of session

	// used to serialize the token for the session
	passport.serializetoken(function (token, done) {
		done(null, token.id);
	});

	// used to deserialize the token
	passport.deserializetoken(function (id, done) {
		token.findById(id, function (err, token) {
			done(err, token);
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new _passportLocal2.default({
		// by default, local strategy uses tokenname and password, we will override with email
		tokennameField: 'email',
		passwordField: 'password',
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, function (req, email, password, done) {

		// asynchronous
		// token.findOne wont fire unless data is sent back
		process.nextTick(function () {

			// find a token whose email is the same as the forms email
			// we are checking to see if the token trying to login already exists
			token.findOne({ 'local.email': email }, function (err, token) {
				// if there are any errors, return the error
				if (err) return done(err);

				// check to see if theres already a token with that email
				if (token) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {

					// if there is no token with that email
					// create the token
					var newtoken = new token();

					// set the token's local credentials
					newtoken.local.email = email;
					newtoken.local.password = newtoken.generateHash(password);

					// save the token
					newtoken.save(function (err) {
						if (err) throw err;
						return done(null, newtoken);
					});
				}
			});
		});
	}));
};
//# sourceMappingURL=passport.js.map