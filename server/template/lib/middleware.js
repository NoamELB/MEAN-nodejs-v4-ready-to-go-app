'use strict';
let Response = require('../master/master.response.js');
let self;

/**
 * Template's middleware
 */
class TemplateMiddleware extends Response {
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
	checkSomething(req, res, next) {
		if (true) {
			req.validBody = {
				something: "something"
			};
			next();
		} else {
			self.sendError(res, self.CODES.BAD_REQUEST, "must send something");
		}
	}
}

module.exports = TemplateMiddleware;