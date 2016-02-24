'use strict';

global.Promise = require('bluebird');
Promise.isPromise = function (o) {
	return o && typeof o.then === 'function';
};
global._ = require('lodash');
//# sourceMappingURL=globals.js.map