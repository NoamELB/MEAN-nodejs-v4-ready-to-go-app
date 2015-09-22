'use strict';
let ServicesBase = require('../master/master.services.js');
let self;

/**
 * User's services
 */
class UserServices extends ServicesBase {
    /**
	 * Initializes the instance
	 */
	init(files, app) {
		self = this;
		this.Model = files['model'].getModel();
	}
    
    /**
     * Registers a new user
     */
    saveNewUser(body) {
        // return self.q.ninvoke(new self.Model(body), 'save');
        return Promise.reject("Database must be connected!");
    }
    
    /**
     * Gets a user from the database by id
     */
    getUser(username) {
        // return self.q.ninvoke(self.Model, 'findOne', {username});
        return Promise.reject("Database must be connected!");
    }
}

module.exports = UserServices;