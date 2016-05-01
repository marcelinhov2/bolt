var rimraf = require('rimraf');

module.exports = function (gulp, options, plugins) {
  gulp.task("clean", function(cb) {
    rimraf.sync(options.folder);
    cb(null);
  });
};