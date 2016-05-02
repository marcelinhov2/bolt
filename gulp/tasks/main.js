var runSequence = require('run-sequence');

module.exports = function (gulp, options, plugins) {
  gulp.task('compile', function(cb) {
    runSequence(
      [
        'formatter',
        'scripts', 
        'styles', 
        'images', 
        'fonts'
      ], 
      'templates', 
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
      'watchers', 
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
};