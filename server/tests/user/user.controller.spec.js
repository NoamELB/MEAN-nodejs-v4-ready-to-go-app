'use strict';
let expect = require("chai").expect,
	UserController = require("../../lib/user/user.controller.js"),
	UserServicesMock = require("./mocks/user.services.mock.js"),
	UserDataMock = new (require("./mocks/user.data.mock.js"))(),
	ResMock = require("../mocks/res.mock.js"),
	res,
	controller,
	services;
 
beforeEach(() => {
	res = new ResMock();
	controller = new UserController();
	services = new UserServicesMock();
	controller.init({services});
});

describe("handleLogin", () => {
 	it('should have a bad username and throw an error', (done) => {
		controller.handleLogin({validBody: UserDataMock.badUsername}, res, res.next);
		Promise.resolve().then(() => {
			expect(res.popLatestData()).to.have.property('error');
			done();  
		}).catch(done);
	});
	
	it('should have a bad username and throw an error', (done) => {
		controller.handleLogin({validBody: UserDataMock.badPassword}, res, res.next);
		Promise.resolve().then(() => {
			expect(res.popLatestData()).to.have.property('error');
			done();  
		}).catch(done);
	});
	
	it('should find a user and confirm the password and send it', (done) => {
		let validUser = UserDataMock.validUser;
		controller.handleLogin({validBody: validUser}, res, res.next);
		Promise.resolve().then(() => {
			expect(res.popLatestData()).to.deep.equal({data: validUser});
			done();  
		}).catch(done);
	});
});

describe("handleNewUser", () => {
 	it('should register a new user, and send back the data', (done) => {
		let validUser = UserDataMock.validUser;
		controller.handleNewUser({validBody: validUser}, res, res.next);
		Promise.resolve().then(() => {
			expect(res.popLatestData()).to.deep.equal({data: validUser});
			done();  
		}).catch(done);
	});
});