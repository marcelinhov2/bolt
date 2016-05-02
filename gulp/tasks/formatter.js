module.exports = function (gulp, options, plugins) {
  gulp.task('formatter', function() {
    return gulp.src(options.devPaths.allFiles)
      .pipe(plugins.jsbeautifier({
        indent_level: 4,
        js: {
          'indent_size': 4,
          'indent_char': '  ',
          'indent_level': 0,
          'indent_with_tabs': true,
          'preserve_newlines': true,
          'max_preserve_newlines': 10
        }
      }))
      .pipe(
        gulp.dest(options.devPaths.baseApp)
      );
  });
};