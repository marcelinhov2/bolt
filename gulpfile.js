var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var argv = require('yargs').argv;
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var open = require('open');
var es = require('event-stream');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var bowerFiles = require('main-bower-files');
var rimraf = require('rimraf');
var rename = require("gulp-rename");
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var preprocess = require('gulp-preprocess');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var uglifycss = require('gulp-uglifycss');
var prettify = require('gulp-jsbeautifier');

var env = argv.compress ? 'production' : 'testing';
var folder = argv.compress ? 'dist' : 'www';

var devPaths = {
	base      : 'src/',
	baseApp   : 'src/app',
	allFiles  : 'src/app/**/*',
	index     : 'src/index.html',
	fonts     : 'src/assets/fonts/**/*',
	images    : 'src/assets/images/**/*',
	styles    : 'src/assets/styles/**/*.less',
	baseStyle : 'src/assets/styles/main.less',
	scripts   : 'src/app/**/*.js',
	partials  : 'src/app/**/*.html'
};

var distPaths = {
	app    : folder + "/app",
	styles : folder + "/assets/styles",
	images : folder + "/assets/images",
	fonts  : folder + "/assets/fonts"
}

var bowerCopyFiles = [];

gulp.task("clean", function(cb) {
	rimraf.sync(folder);
	cb(null);
});

gulp.task("bower:scripts", function() {
	var jsBowerFiles = bowerFiles({
		filter: /\.js$/i,
		paths: {
			bowerDirectory: './bower_components'
		}
	});

	return gulp.src(jsBowerFiles)
		.pipe(
			concat('dependencies.js')
		)
		.pipe(
			gulpif(argv.compress, uglify())
		)
		.pipe(
			gulpif(argv.compress, rev())
		)
		.pipe(
			gulp.dest(distPaths.app)
		);
});

gulp.task('bower:styles', function() {
	var cssBowerFiles = bowerFiles({
		filter: /\.css$/i,
		paths: {
			bowerDirectory: './bower_components'
		}
	});

	return gulp.src(cssBowerFiles)
		.pipe(
			concat('bower.css')
		)
		.pipe(
			cleanCSS({compatibility: 'ie8'})
		)
		.pipe(
			gulpif(argv.compress, rev())
		)
		.pipe(
			gulp.dest(distPaths.styles)
		);
});

gulp.task('code:prettify', function() {
	return gulp.src(devPaths.allFiles)
		.pipe(prettify({
			indent_level: 4,
			js: {
				"indent_size": 4,
				"indent_char": "	",
				"indent_level": 0,
				"indent_with_tabs": true,
				"preserve_newlines": true,
				"max_preserve_newlines": 10
			}
		}))
		.pipe(
			gulp.dest(devPaths.baseApp)
		);
});

gulp.task('scripts', function() {
	return gulp.src(devPaths.scripts)
		.pipe(
			cache('scripts')
		)
		.pipe(
			preprocess({
				context: {
					NODE_ENV: env
				}
			})
		)
		.pipe(
			jshint(
				{
					"maxparams": 10,
					"indent": false,
					"camelcase": true,
					"eqeqeq": true,
					"forin": true,
					"immed": true,
					"latedef": true,
					"noarg": true,
					"noempty": true,
					"nonew": true,
					"unused": true,
					"laxbreak": true,
					"laxcomma": true,

					"globals": { 
						"require": false
					}
				}
			)
		)
		.pipe(
			jshint.reporter('default')
		)
		.pipe(
			gulpif(argv.compress, uglify())
		)
		.pipe(
			gulpif(argv.compress, concat('main.js'))
		)
		.pipe(
			gulpif(argv.compress, rev())
		)
		.pipe(
			gulp.dest(distPaths.app)
		);
});

gulp.task('styles', function() {
	return gulp.src(devPaths.baseStyle)
		.pipe(
			less()
		)
		.pipe(
			gulpif(argv.compress, rev())
		)
		.pipe(
			gulpif(argv.compress, uglifycss({
				"maxLineLen": 80,
				"uglyComments": true
			}))
		)
		.pipe(
			gulp.dest(distPaths.styles)
		);
});

gulp.task('styles:reload', function() {
	return gulp.src(devPaths.baseStyle)
		.pipe(
			less()
		)
		.pipe(
			gulp.dest(distPaths.styles)
		)
		.pipe(
			connect.reload()
		);
});

gulp.task('images', function() {
	return gulp.src(devPaths.images)
		.pipe(
			cache('images')
		)
		.pipe(
			gulpif(argv.compress, imagemin())
		)
		.pipe(
			gulp.dest(distPaths.images)
		);
});

gulp.task('fonts', function() {
	return gulp.src(devPaths.fonts)
		.pipe(
			cache('fonts')
		)
		.pipe(
			gulp.dest(distPaths.fonts)
		);
});

gulp.task('partials', function() {
	return gulp.src(devPaths.partials)
		.pipe(
			templateCache('templates', {
				standalone: true,
				root: '/app/'
			})
		)
		.pipe(
			rename({
				extname: '.js'
			})
		)
		.pipe(
			gulpif(argv.compress, uglify())
		)
		.pipe(
			gulpif(argv.compress, rev())
		)
		.pipe(
			gulp.dest(distPaths.app)
		);
});

gulp.task('index', function() {
	var scripts, styles;

	styles = folder + "/assets/styles/**/*.css";
	
	if(argv.compress){
		scripts = [
			folder + "/app/dependencies-*.js",
			folder + "/app/templates-*.js",
			folder + "/app/main-*.js"
		]
	} else {
		scripts = folder + "/app/**/*.js";
	}

	return gulp.src(devPaths.index)
		.pipe(
			inject(
				es.merge(
					gulp.src(styles, {
						read: false
					}), 
					gulp.src(scripts, {
						read: false
					})
				), {
					ignorePath: folder,
					addRootSlash: false
				}
			)
		)
		.pipe(
			gulp.dest(folder)
		);
});

gulp.task('server', function() {
	connect.server({
		port: 1337,
		root: folder,
		base: 'http://localhost',
		fallback: folder + '/index.html',
		livereload: !argv.compress
	});

	if(!argv.compress)
		open('http://localhost:1337');
});

gulp.task('reload', function() {
	return gulp.src(devPaths.index)
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(devPaths.partials, ['compile']);
	gulp.watch(devPaths.scripts, ['compile']);
	gulp.watch(devPaths.styles, ['styles:reload']);
	gulp.watch(devPaths.images, ['compile']);
	gulp.watch(devPaths.index, ['compile']);
});

gulp.task('compile', function(cb) {
	runSequence(
		[
			'code:prettify',
			'scripts', 
			'styles', 
			'images', 
			'fonts'
		], 
		'partials', 
		'index', 
		'reload', 
		cb
	);
});

gulp.task('up', function(cb) {
	runSequence(
		'clean',
		'bower:styles', 
		'bower:scripts', 
		'compile', 
		'watch', 
		'server', 
		cb
	);
});

gulp.task('build', function(cb) {
	runSequence(
		'clean', 
		'bower:styles',
		'bower:scripts', 
		'compile', 
		cb
	);
});

gulp.task('default', ['up']);