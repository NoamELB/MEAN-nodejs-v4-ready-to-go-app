'use strict';
let Main = require(`${__dirname}/lib/main/main.js`);

let main = new Main(__dirname.slice(0, -7)); // slice the /server folder prefix
main.useCommonPackages();
main.createBaseRoutes();
main.createServer();
main.connectToDb();
main.writeRobotsFile();