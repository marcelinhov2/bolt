var open = require('open');

module.exports = function (gulp, options, plugins) {
  gulp.task('server', function() {
    plugins.connect.server({
      port: 1337,
      root: options.folder,
      base: 'http://localhost',
      fallback: options.folder + '/index.html',
      livereload: !options.argv.compress
    });

    if(!options.argv.compress)
      open('http://localhost:1337');
  });

  gulp.task('reload', function() {
    return gulp.src(options.devPaths.index)
      .pipe(plugins.connect.reload());
  });
};