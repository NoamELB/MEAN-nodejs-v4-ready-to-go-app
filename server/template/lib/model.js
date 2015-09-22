'use strict';
let ModelBase = require('../master/master.model.js');

/**
 * Template's Model
 */
class TemplateModel extends ModelBase {	
    /**
     * Creates the schema of the model
     */
    init(files, app) {
        this.schema = {
            something: String
        };
        this.setModel('Template', this.mongoose.Schema(this.schema));
    }
}

module.exports = TemplateModel;