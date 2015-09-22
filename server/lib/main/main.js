'use strict';
// External dependencies
let		fs 				= require('fs'),
		cors 			= require('cors'),
		helmet			= require('helmet'),
	 	express 		= require('express'),
		mongoose 		= require('mongoose'),
		bodyParser		= require('body-parser'),
		compression		= require('compression'),
		cookieParser	= require('cookie-parser'),
		prerender		= require('prerender-node'),
		session			= require('express-session'),
		MongoStore 		= require('connect-mongo')(session);

// Internal
let 	Bootstrap 		= require('./bootstrap.js'),
		config			= require('./config.js');
		
/**
 * Main of the app
 */
class Main {
	/**
	 * Default constructor
	 */
	constructor(root) {
        this.app = express();
		this.root = root;
    }
	
	/**
	 * Sets the dependencies of the app
	 */
	useCommonPackages() {
		this.app.use(compression({level: 1}));
		this.app.use(helmet());
		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		this.app.use(cors());
	}
	
	createBaseRoutes() {
		this.app.set('view engine', 'jade');
		this.app.set('port', (process.env.PORT || 5000));	
		this.app.use(express.static(this.root + '/app'));
		this.app.use('/assets', express.static(this.root + '/assets')); // HTML 5 mode fixes
		this.app.use(prerender.set('prerenderServiceUrl', config.prerenderUrl)); // prerender help with SEO stuff
		this.app.use(/\/(?!(data)).*/, function(req, res) { // everything that not '/data' will go through the index.html
			res.sendFile('app/' + config.index + '.html', { root: this.root });
		});
		
		this.app.get("/", function(req, res) {
			res.render(config.index);
		});
	}
	
	/**
	 * Listens to the port, and instantiates the routes of the app
	 */
	attachListener() {
		this.app.listen(this.app.get('port'), () => {
			console.log("\t+*+*+ New server on localhost:" + this.app.get('port') + " +*+*+");
		});
	}
	
	/**
	 * Setting up the db
	 */ 
	connectToDb() {
		// mongoose.connect(config.dbUrl);
		// var db = mongoose.connection;
		// db.on('error', console.error.bind(console, 'connection error:'));
		
		// app.use(session({secret: 'secretcat',
		// 				 store: new MongoStore({ mongooseConnection: db}),
		// 				 cookie: { maxAge:  daysToStoreSessionCookie, httpOnly: true, secure: true },
		// 				 saveUninitialized: true,
		//                  resave: true }));
		
		// db.once('open', () => {
		// 	console.log("\t+*+*+ Connected to mongodb! on MongoLab +*+*+");
		// });
		
		// TODO move it inside the db.once
		let bootstrap = new Bootstrap(this.app);
		bootstrap.init();			
	}
	
	//robots.txt generate based on env
	writeRobotsFile() {
		fs.writeFile(this.root + '/app/robots.txt', config.robots, function(e) {
			if (e) console.log(e);
		});
	}
};

module.exports = Main;