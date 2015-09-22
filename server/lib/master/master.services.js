'use strict';
/**
 *  Services base class to manage services
 */
class ServicesBase {
    constructor(q) {
        this.q = q || require('q');
    }
};

module.exports = ServicesBase;