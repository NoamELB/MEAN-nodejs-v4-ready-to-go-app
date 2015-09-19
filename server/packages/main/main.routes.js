// var controller = require('./main.controller'),
// 	middleware = require('./main.middleware');

function init (app) {
	app.get('/data/tryOut', function (req, res) {
		res.send({data: "tried successfully"});
	});
}

module.exports = init;