'use strict';
let Response = require('../master/master.response.js');
let self;

/**
 * User's Controller
 */
class UserController extends Response {	
    /**
	 * Initializes the instance
	 */
	init(files, app) {
		self = this;
		this.services = files['services'];
	}
    
    /**
     * Tries to login to server with given username and password
     */
    handleLogin(req, res) {
        self.services.getUser(req.validBody.username)
        .then(data => {
            if (!data) {
                self.sendError(res, self.CODES.UNAUTHORIZED, "No such username: " + req.validBody.username);
            } else if (data.password !== req.validBody.password) {
                self.sendError(res, self.CODES.UNAUTHORIZED, "Invalid password given: " + req.validBody.password);
            } else {
                self.sendData(res, data);
            }
        })
        .catch(error => {
            self.sendError(res, self.CODES.INTERNAL_ERROR, "An error occured trying to login");
        });
    }
    
    /**
     * Tries to register a user to database 
     */
    handleNewUser(req, res) {
        self.services.saveNewUser(req.validBody)
        .then(data => {
            res.send({data}); 
        })
        .catch(error => {
            self.sendError(res, self.CODES.INTERNAL_ERROR, "An error occured trying to sign up");
        });
    }
}

module.exports = UserController;