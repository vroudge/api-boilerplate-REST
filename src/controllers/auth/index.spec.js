describe('[Controller - AUTH]', () => {
    describe('PUT - user', () => {
        it('Updates a token and adds email', () => {
            return request('post', '/user')
                .send({ uid: 'abc123' })
                .expect((res) => {
                    request('put', '/auth/user')
                        .send({ uid: res.body.uid, token: res.body.token, email: 'vroudge@kek.com' })
                        .expect(200);
                });
        });
        it('Refuses to update if no token is provided', () => {
            return request('put', '/auth/user')
                .expect(403);
        });
    });
});

