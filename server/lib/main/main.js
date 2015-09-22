'use strict';
// External dependencies
let		fs 				= require('fs'),
		cors 			= require('cors'),
		http			= require('http'),
		//https			= require('https'),
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
		Config			= require('./config.js');
		
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
		this.config = (new Config()).enviorment;
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
		this.app.use(prerender.set('prerenderServiceUrl', this.config.prerenderUrl)); // prerender help with SEO stuff
		// everything that not '/data' will go through the index.html
		this.app.use(/\/(?!(data)).*/, (req, res) => { res.sendFile('app/' + this.config.index + '.html', { root: this.root }); });
		this.app.get("/", (req, res) => { res.render(this.config.index); });
	}
	
	/**
	 * Create server with http, for using https replace this (great manual here: http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)
	 */
	createServer() {
		http.createServer(this.app).listen(this.app.get('port'));
		// https.createServer({ 
	  	// 	key: fs.readFileSync('key.pem'),
      	// 	cert: fs.readFileSync('cert.pem')
	  	// }, this.app.get('port')).listen(this.app.get('port'));
		console.info("\t+*+*+ New server on localhost:" + this.app.get('port') + " +*+*+");
	}
	
	/**
	 * Setting up the db
	 */ 
	connectToDb() {
		// mongoose.connect(this.config.dbUrl);
		// let db = mongoose.connection;
		// db.on('error', console.error.bind(console, 'connection error:'));
		
		// app.use(session({secret: 'secretcat',
		// 				 store: new MongoStore({ mongooseConnection: db}),
		// 				 cookie: { maxAge:  daysToStoreSessionCookie, httpOnly: true, secure: true },
		// 				 saveUninitialized: true,
		//                  resave: true }));
		
		// db.once('open', () => {
		// 	console.log("\t+*+*+ Connected to mongodb! on MongoLab +*+*+");
		let bootstrap = new Bootstrap(this.app);
		bootstrap.init();
		// });
		
					
	}
	
	//robots.txt generate based on env
	writeRobotsFile() {
		fs.writeFile(this.root + '/app/robots.txt', this.config.robots, (e) => { if (e) console.error(e); });
	}
};

module.exports = Main;