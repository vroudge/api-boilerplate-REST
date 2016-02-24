describe("[CONTROLLERS] - Index", () => {
	it('GET / - gives name, version and description of api', () => {
		return request('get', '/').expect(200).expect((res) => {
			return expect(res.body).to.have.keys(['API','Version','Description'])
		})
	});
});