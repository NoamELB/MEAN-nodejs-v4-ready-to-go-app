'use strict';
/**
 * User's router
 */
class UserRouter {
	/**
	 * Initializes the instance
	 */
	init(files, app) {
     	this.initRoutes(app, files['controller'], files['middleware']);   
	}
		
    /**
	 * Initiates the routes of the User package
	 */
	initRoutes(app, controller, middleware) {
		app.post('/data/login', 
						middleware.hasLoginParams,
						controller.handleLogin);
		
		app.post('/data/register',
						middleware.hasRegisterParams,
						middleware.isNotRegistered,
						controller.handleNewUser);
	}
}

module.exports = UserRouter;