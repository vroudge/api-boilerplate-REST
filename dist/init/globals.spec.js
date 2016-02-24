'use strict';

describe('[GLOBALS]', function () {
	it('Has Bluebird Promises', function () {
		var bbird = require('bluebird');
		expect(global.Promise).to.be.equal(bbird);
	});
	it('Has isPromise method', function () {
		expect(Promise.isPromise).to.not.be.undefined;
	});
});
//# sourceMappingURL=globals.spec.js.map