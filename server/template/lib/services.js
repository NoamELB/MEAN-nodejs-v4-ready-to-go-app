'use strict';
let ServicesBase = require('../master/master.services.js');
let self;

/**
 * Template's services
 */
class TemplateServices extends ServicesBase {
    /**
	 * Initializes the instance
	 */
	init(files, app) {
		self = this;
		this.Model = files['model'].getModel();
	}
    
    /**
     * Registers a new something
     */
    saveSomething(something) {
        return self.q.ninvoke(new self.Model(something), 'save');
    }
    
    /**
     * Gets a something from the database by id
     */
    getSomething(something) {
        return self.q.ninvoke(self.Model, 'findOne', {something});
    }
}

module.exports = TemplateServices;