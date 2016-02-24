describe('[Controller - NO-AUTH]', () => {
    describe('POST - user', () => {
        it('Returns an error if no email is provided', () => {
            return request('post', '/user')
                .expect(400);
        });
        it('Returns a token if uid is provided', () => {
            return request('post', '/user')
                .send({ uid: 'abc123' })
                .expect(200)
                .expect((res) => {
                    expect(res.body).to.have.keys(['uid', 'token']);
                });
        });
    });
    describe.only('GET - file', () => {
        it('returns an error if no pid is provided', () => {
            return request('get', '/file')
                .expect(400);
        });
        it('gets a file if pid is provided', () => {
            return request('post', '/file')
                .type('form')
                .attach('file', 'package.json')
                .expect((res) => {
                    return request('get', `/file?pid=${res.body.pid}`)
                        .then((data) => {
                            console.log(data.body);
                        });
                });

        });
    });
    describe('POST - file', () => {
        it('sends the file and saves it', () => {
            return request('post', '/file')
                .type('form')
                .attach('file', 'package.json')
                .expect(200)
                .expect((res) => {
                    expect(res.body.pid).to.be.a('string');
                });
        });
    });
});
