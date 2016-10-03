var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('./aws/credentials.json'));

module.exports = function (gulp, options, plugins) {
    gulp.task('publish', function() {
      var publisher = plugins.awspublish.create(credentials);

      var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
      };

      return gulp.src(options.distPaths.allFiles)
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(plugins.awspublish.reporter());
    });
};