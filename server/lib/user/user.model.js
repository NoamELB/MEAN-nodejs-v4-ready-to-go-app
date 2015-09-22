'use strict';
let ModelBase = require('../master/master.model.js');

/**
 * User's Model
 */
class UserModel extends ModelBase {	
    /**
     * Creates the schema of the model
     */
    init(files, app) {
        this.schema = {
            username: String,
            password: String
        };
        this.setModel('User', this.mongoose.Schema(this.schema));
    }
}

module.exports = UserModel;