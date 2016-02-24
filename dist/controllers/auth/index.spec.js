'use strict';

describe('[Controller - AUTH]', function () {
    describe('PUT - user', function () {
        it('Updates a token and adds email', function () {
            return request('post', '/user').send({ uid: 'abc123' }).expect(function (res) {
                request('put', '/auth/user').send({ uid: res.body.uid, token: res.body.token, email: 'vroudge@kek.com' }).expect(200);
            });
        });
        it('Refuses to update if no token is provided', function () {
            return request('put', '/auth/user').expect(403);
        });
    });
});
//# sourceMappingURL=index.spec.js.map