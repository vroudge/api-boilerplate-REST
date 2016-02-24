describe('[GLOBALS]', () => {
	it('Has Bluebird Promises', () => {
		var bbird = require('bluebird');
		expect(global.Promise).to.be.equal(bbird);
	});
	it('Has isPromise method', () => {
		expect(Promise.isPromise).to.not.be.undefined;
	});

});