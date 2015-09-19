'use strict';

/**
 *  Router Manager class to register routes
 */
class RouterManager {
    constructor(app) {
        this.app = app;
        this.routes = [];
    }
    
    loadRoutes () {
        this.routes = [require('./packages/main/main.routes')];
    }
    
    register () {
        for (let i = 0, len = this.routes.length; i < len; i++ ) {
            this.routes[i](this.app);            
        }
    }
}

module.exports = RouterManager;