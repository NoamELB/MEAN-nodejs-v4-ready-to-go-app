var env = require('./env.json');
//local ==> mongodb://127.0.0.1:27017/test
function config() {
  	var node_env = 'development';
  	switch (process.env.NODE_ENV) {
		case 'production': node_env = 'production';
			break;
		case 'staging': node_env = 'staging';
			break;
	}
	return env[node_env];
};

module.exports = config();