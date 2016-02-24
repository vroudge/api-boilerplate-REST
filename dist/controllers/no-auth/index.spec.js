'use strict';

describe('[Controller - NO-AUTH]', function () {
    describe('POST - user', function () {
        it('Returns an error if no email is provided', function () {
            return request('post', '/user').expect(400);
        });
        it('Returns a token if uid is provided', function () {
            return request('post', '/user').send({ uid: 'abc123' }).expect(200).expect(function (res) {
                expect(res.body).to.have.keys(['uid', 'token']);
            });
        });
    });
    describe.only('GET - file', function () {
        it('returns an error if no pid is provided', function () {
            return request('get', '/file').expect(400);
        });
        it('gets a file if pid is provided', function () {
            return request('post', '/file').type('form').attach('file', 'package.json').expect(function (res) {
                return request('get', '/file?pid=' + res.body.pid).then(function (data) {
                    console.log(data.body);
                });
            });
        });
    });
    describe('POST - file', function () {
        it('sends the file and saves it', function () {
            return request('post', '/file').type('form').attach('file', 'package.json').expect(200).expect(function (res) {
                expect(res.body.pid).to.be.a('string');
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map