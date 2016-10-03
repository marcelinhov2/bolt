var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('./aws/credentials.json'));

module.exports = function (gulp, options, plugins) {
    gulp.task('publish', function() {
      var publisher = plugins.awspublish.create(credentials);

      var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
      };

      return gulp.src(options.distPaths.allFiles)
        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        .pipe(publisher.publish(headers))

        // create a cache file to speed up consecutive uploads
        .pipe(publisher.cache())

         // print upload updates to console
        .pipe(plugins.awspublish.reporter());
    });
};