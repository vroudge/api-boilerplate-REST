'use strict';

describe("[CONTROLLERS] - Index", function () {
	it('GET / - gives name, version and description of api', function () {
		return request('get', '/').expect(200).expect(function (res) {
			return expect(res.body).to.have.keys(['API', 'Version', 'Description']);
		});
	});
});
//# sourceMappingURL=index.spec.js.map