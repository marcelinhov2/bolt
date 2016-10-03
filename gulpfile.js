var argv = require('yargs').argv;
var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
	scope: ['devDependencies']
});

var folder = argv.compress ? 'dist' : 'www';

var options = {
	argv : argv,
	pattern : ['gulp/**/*.js'],	
	folder : folder,
	env : argv.compress ? 'production' : 'testing',
	devPaths : {
		base      : 'src/',
		baseApp   : 'src/app',
		allFiles  : 'src/app/**/*',
		index     : 'src/index.html',
		fonts     : 'src/assets/fonts/**/*',
		images    : 'src/assets/images/**/*',
		styles    : 'src/assets/styles/**/*.less',
		baseStyle : 'src/assets/styles/main.less',
		scripts   : 'src/app/**/*.js',
		templates : 'src/app/**/*.html'
	},
	distPaths : {
		app      : folder + '/app',
		allFiles : folder + '/**/*',
		styles   : folder + '/assets/styles',
		images   : folder + '/assets/images',
		fonts    : folder + '/assets/fonts'
	}
}

require('load-gulp-tasks')(gulp, options, plugins);