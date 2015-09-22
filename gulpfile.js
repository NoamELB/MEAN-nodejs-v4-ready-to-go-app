'use strict';
let gulp 		= require("gulp"),
	sass 		= require("gulp-sass"),
	server 		= require("gulp-develop-server"),
	browserify 	= require("gulp-browserify"),
	uglify 		= require("gulp-uglify"),
	mocha 		= require("gulp-mocha"),
	minifyCSS 	= require("gulp-minify-css"),
	rename 		= require("gulp-rename");

// Server unit tests
gulp.task("server:tests", () => {
	return gulp.src('./server/tests/**/*.js')
			.pipe(mocha());
});

// sass compiler
gulp.task("compile:css", () => {
	gulp.src("app/assets/styles/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("app/assets/styles"));
});

// Minify css
gulp.task("minify:css",  () => {
	gulp.src("app/assets/styles/style.css")
		.pipe(minifyCSS({keepSpecialComments:0}))
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("app/assets/styles"));
});

// Browserify
gulp.task("scripts:browserify", () => {
	gulp.src("app/assets/packages/index.js")
		.pipe(browserify({
			insertGlobals : true
		}))
		.pipe(rename("main.js"))
		.pipe(gulp.dest("app/assets"));
});

// Uglify js
gulp.task("scripts:uglify", () => {
	gulp.src("app/assets/main.js")
		.pipe(uglify())
		.pipe(rename("main.min.js"))
		.pipe(gulp.dest("app/assets"));
});

// Server start
gulp.task("server:start", () => {
	server.listen({path: './server/main.js'});
});
// Server kill
gulp.task("server:restart", () => {
	server.restart();
});

// WATCH
// =====
gulp.task("watch", ["server:tests", "compile:css", "scripts:browserify", "server:start"], () => {
	gulp.watch(["app/assets/styles/*.scss"], ["compile:css"]);
	gulp.watch(["app/assets/styles/style.css"], ["minify:css"]);
	gulp.watch(["app/assets/packages/*.js", "app/assets/packages/**/scripts/*.js"], ["scripts:browserify"]);
	gulp.watch(["app/assets/main.js"], ["scripts:uglify"]);
	gulp.watch(["server/*.js", "server/**/*.js", "server/*.json", "server/**/*.json"], ["server:restart"]);
});