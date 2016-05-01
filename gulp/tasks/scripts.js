module.exports = function (gulp, options, plugins) {
  gulp.task('scripts', function() {
    return gulp.src(options.devPaths.scripts)
      .pipe(
        plugins.cached('scripts')
      )
      .pipe(
        plugins.preprocess({
          context: {
            NODE_ENV: options.env
          }
        })
      )
      .pipe(
        plugins.jshint(
          {
            'maxparams': 10,
            'indent': false,
            'camelcase': true,
            'eqeqeq': true,
            'forin': true,
            'immed': true,
            'latedef': true,
            'noarg': true,
            'noempty': true,
            'nonew': true,
            'unused': true,
            'laxbreak': true,
            'laxcomma': true,

            'globals': { 
              'require': false
            }
          }
        )
      )
      .pipe(
        plugins.jshint.reporter('default')
      )
      .pipe(
        plugins.if(options.argv.compress, plugins.uglify())
      )
      .pipe(
        plugins.if(options.argv.compress, plugins.concat('main.js'))
      )
      .pipe(
        plugins.if(options.argv.compress, plugins.rev())
      )
      .pipe(
        gulp.dest(options.distPaths.app)
      );
  });
};