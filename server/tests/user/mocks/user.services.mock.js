'use strict';
let UserDataMock = new (require("./user.data.mock.js"))();
/**
 * user services mock
 */
class UserServicesMock {
	getUser(username) {
		let validUser = UserDataMock.validUser,
			promise;
		if (username !== validUser.username) { // not found indeed
			promise = Promise.resolve();
		} else {
			promise = Promise.resolve(validUser);
		}
		return promise;
	}
	
    saveNewUser(user) {
        return Promise.resolve(user);
    }
}

module.exports = UserServicesMock;