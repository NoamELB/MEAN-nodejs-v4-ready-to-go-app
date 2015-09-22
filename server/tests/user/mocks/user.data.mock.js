'use strict';
/**
 * user services mock
 */
class UserServicesMock {
	get emptyData() {
		return {};
	}
	
	get usernameOnly() {
		return {username: "blah"};
	}
	
	get badUsername() {
		return {username: this.validUser.username + "123"};
	}
	
	get passwordOnly() {
		return {password: "hlab"};
	}
	
	get badPassword() {
		return {username: this.validUser.username, password: this.validUser.password + "123"};
	}
	
	get validUser() {
		return {username: "valid", password: "user"};
	}
}

module.exports = UserServicesMock;