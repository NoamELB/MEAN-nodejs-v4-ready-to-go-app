'use strict';
/**
 *  Model base class to manage the model
 */
class ModelBase {
    constructor(mongoose) {
        this.mongoose = mongoose || require('mongoose');
    }
    
    setModel(name, val) {
        try {
            this.model = this.mongoose.model(name);            
        } catch (e) {
            this.model = this.mongoose.model(name, val);
        }
    }
    
    /**
     * Returns the mongoose model
     */
    getModel() {
        return this.model;
    }
};

module.exports = ModelBase;