'use strict';
/**
 *  Bootstrap manager to initiate all packages
 */
class Bootstrap {
    /**
     * Default constructor
     */
    constructor(app) {
        this.app = app;
        app.get('/data/tryOut', (req, res) => {
            res.send({data: "tried successfully"});
        });
    }
    
    /**
     * Loads the routes structure from the structure.json file
     */
    init() {
        let structure = require('./structure.json');
        for (let i = 0; i < structure.folders.length; i++) {
            let files = {};
            // creates new instances
            for (let j = 0; j < structure.templates.length; j++) {
                files[structure.templates[j]] = new (require(`../${structure.folders[i]}/${structure.folders[i]}.${structure.templates[j]}.js`))(); 
            }
            // initializes all objects
            for (let j = 0; j < structure.templates.length; j++) {
                files[structure.templates[j]].init(files, this.app); 
            }
        }
    }
};

module.exports = Bootstrap;