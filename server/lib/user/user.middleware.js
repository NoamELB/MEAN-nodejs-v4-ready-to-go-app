'use strict';
let Response = require('../master/master.response.js');
let self;

/**
 * User's middleware
 */
class UserMiddleware extends Response {
	/**
	 * Initializes the instance
	 */
	init(files, app) {
		self = this;
		this.services = files['services'];
	}
	
	/**
	 * Makes sure valid login params are there
	 */
	hasLoginParams(req, res, next) {
		if (req.body.username && req.body.password) {
			req.validBody = {
				username: req.body.username,
				password: req.body.password
			};
			next();
		} else {
			self.sendError(res, self.CODES.BAD_REQUEST, "must send username and password");
		}
	}
	
	/**
	 * Makes sure valid register params are there
	 */
	hasRegisterParams(req, res, next) {
		if (req.body.username && req.body.password) {
			req.validBody = {
				username: req.body.username,
				password: req.body.password
			};
			next();
		} else {
			self.sendError(res, self.CODES.BAD_REQUEST, "must send username and password");
		}
	}
	
	/**
	 * Makes sure a user with that username is not already registered
	 */
	isNotRegistered(req, res, next) {
		self.services.getUser(req.validBody.username)
		.then(d => {
			if (!d) {
				next();
			} else {
				self.sendError(res, self.CODES.UNAUTHORIZED, "There is already a user with that username");
			} 
		})
		.catch(e => {
			self.sendError(res, self.CODES.INTERNAL_ERROR, "an error occured while checking username");
		});
	}
}

module.exports = UserMiddleware;