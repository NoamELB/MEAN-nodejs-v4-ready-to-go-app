'use strict';

// External dependencies
var express 		= require('express'),
	fs 				= require('fs'),
	http 			= require('http'),
	mongoose 		= require('mongoose'),
	cookieParser	= require('cookie-parser'),
 	session			= require('express-session'),
 	MongoStore 		= require('connect-mongo')(session),
	bodyParser		= require('body-parser'),
	cors 			= require('cors'),
	prerender		= require('prerender-node'),
	compression		= require('compression'),
	helmet			= require('helmet');

//Internals
var	config			= require('./config'),
	Router 			= require('./router'),
	dbUrl			= config.dbUrl,
	prerenderUrl 	= config.prerenderUrl,
	index			= config.index,
	day 			= 1000 * 60 * 60 * 24,
	daysToStoreSessionCookie = day * 30;
		
__dirname = __dirname.slice(0, -7); // slice the /server folder prefix

//Setting up the db
// mongoose.connect(dbUrl);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// Express dependencies
var app = express();
app.use(compression({level: 1}));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/app'));

app.use('/assets', express.static(__dirname + '/assets')); // HTML 5 mode fixes
app.use(prerender.set('prerenderServiceUrl', prerenderUrl)); // prerender help with SEO stuff
app.use(/\/(?!(data)).*/, function(req, res) { // everything that not '/data' will go through the index.html
	res.sendFile('app/' + index + '.html', { root: __dirname });
});
// app.use(session({secret: 'secretcat',
// 				 store: new MongoStore({ mongooseConnection: db}),
// 				 cookie: { maxAge:  daysToStoreSessionCookie, httpOnly: true, secure: true },
// 				 saveUninitialized: true,
//                  resave: true }));

app.get("/", function(req, res) {
	res.render(index);
});

app.listen(app.get('port'), function(){
	console.log("\t+*+*+ New server on localhost:" + app.get('port') + " +*+*+");
	let router = new Router(app);
	router.loadRoutes();
	router.register();
});

// db.once('open', function(){
// 	console.log("\t+*+*+ Connected to mongodb! on MongoLab +*+*+");
// 	//register routes here instead
	
// });

//robots.txt generate based on env
fs.writeFile(__dirname + '/app/robots.txt', config.robots, function(e) {
	if (e) console.log(e);
});