'use strict';
/**
 * Template's router
 */
class TemplateRouter {
	/**
	 * Initializes the instance
	 */
	init(files, app) {
     	this.initRoutes(app, files['controller'], files['middleware']);   
	}
		
    /**
	 * Initiates the routes of the Template package
	 */
	initRoutes(app, controller, middleware) {
		app.get('/something', 
						middleware.checkSomething,
						controller.handleSomething);
	}
}

module.exports = TemplateRouter;