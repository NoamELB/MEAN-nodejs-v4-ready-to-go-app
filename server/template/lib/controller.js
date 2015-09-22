'use strict';
let Response = require('../master/master.response.js');
let self;

/**
 * Template's Controller
 */
class TemplateController extends Response {	
    /**
	 * Initializes the instance
	 */
	init(files, app) {
		self = this;
		this.services = files['services'];
	}
    
    /**
     * Does something
     */
    handleSomething(req, res) {
        self.services.getSomething(req.validBody.something)
        .then(data => {
            if (!data) {
                self.sendError(res, self.CODES.UNAUTHORIZED, "Did not find");
            } else {
                self.sendData(res, data);
            }
        })
        .catch(error => {
            self.sendError(res, self.CODES.INTERNAL_ERROR, "An error occured");
        });
    }
}

module.exports = TemplateController;