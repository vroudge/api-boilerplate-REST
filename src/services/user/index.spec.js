import userService from '../user';

describe('[SERVICES] - user', () => {
	describe('Create - ', () => {
		it('Creates a user without email', () => {
			return userService.create('abcd1234')
				.then((user) => {
					expect(user.token).to.be.a('string');
					expect(user.uid).to.equal('abcd1234');
				});
		});
	});

	describe('Update - ', () => {
		it('Updates a user without email and adds email', () => {
			return userService.create('abcd1234')
				.then((user) => {
					return userService.update(user.uid, user.token, 'kek@lol.com');
				}).then((user) => {
					expect(user.token).to.be.a('string');
					expect(user.email).to.be.a('string');
					expect(user.uid).to.be.a('string');
				});
		});
		it('Does not update user without email', () => {

		});

	});
});
