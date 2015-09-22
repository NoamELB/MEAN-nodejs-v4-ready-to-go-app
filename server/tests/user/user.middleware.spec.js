'use strict';
let expect = require("chai").expect,
	UserMiddleware = require("../../lib/user/user.middleware.js"),
	UserServicesMock = require("./mocks/user.services.mock.js"),
	UserDataMock = new (require("./mocks/user.data.mock.js"))(),
	ResMock = require("../mocks/res.mock.js"),
	res,
	middleware,
	services;
 
beforeEach(() => {
	res = new ResMock();
	middleware = new UserMiddleware();
	services = new UserServicesMock();
	middleware.init({services});
});
 
describe("hasLoginParams", () => {
 	it('should return an error if either username or password were not provided', () => {
		middleware.hasLoginParams({body: UserDataMock.emptyData}, res, res.next);
		expect(res.popLatestData()).to.have.property('error');
		
		middleware.hasLoginParams({body: UserDataMock.usernameOnly}, res, res.next);
		expect(res.popLatestData()).to.have.property('error');
		
		middleware.hasLoginParams({body: UserDataMock.passwordOnly}, res, res.next);
		expect(res.popLatestData()).to.have.property('error');
	});
	
	it('should put valid data only in req.validBody', () => {
		let req = {body: UserDataMock.validUser};
		middleware.hasLoginParams(req, res, res.next);
		expect(res.popLatestData()).to.equal('next');
		expect(req.validBody).to.deep.equal(UserDataMock.validUser);
	});
});

describe("hasRegisterParams", () => {
 	it('should return an error if either username or password were not provided', () => {
		middleware.hasLoginParams({body: UserDataMock.emptyData}, res, res.next);
		expect(res.popLatestData()).to.have.property('error');
		
		middleware.hasLoginParams({body: UserDataMock.usernameOnly}, res, res.next);
		expect(res.popLatestData()).to.have.property('error');
		
		middleware.hasLoginParams({body: UserDataMock.passwordOnly}, res, res.next);
		expect(res.popLatestData()).to.have.property('error');
	});
	
	it('should put valid data only in req.validBody', () => {
		let req = {body: UserDataMock.validUser};
		middleware.hasLoginParams(req, res, res.next);
		expect(res.popLatestData()).to.equal('next');
		expect(req.validBody).to.deep.equal(UserDataMock.validUser);
	});
});

describe("isNotRegistered", () => {
	let req = {};
	beforeEach(() => {
		req.validBody = UserDataMock.validUser;
	});
	
 	it('should not find a user with that username and procceed', (done) => {
		req.validBody.username += 123;
		middleware.isNotRegistered(req, res, res.next);
		Promise.resolve().then(() => {
			expect(res.popLatestData()).to.equal('next');
			done();  
		}).catch(done);
	});
	
	it('should find a user with that username and throw an error', (done) => {
		middleware.isNotRegistered(req, res, res.next);
		Promise.resolve().then(() => {
			expect(res.popLatestData()).to.have.property('error');
			done();  
		}).catch(done);
	});
});