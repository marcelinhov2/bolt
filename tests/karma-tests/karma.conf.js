module.exports = function(config){
  config.set({

    basePath : '../../',

    files : [
      'www/app/dependencies.js',
      'www/app/main.js',
      'www/app/**/*.js',
      'www/app/templates.js',
      'tests/karma-tests/app/**/*.js'
    ],

    autoWatch : true,
    singleRun: false,

    frameworks: [ 'jasmine' ],

    browsers : [ 'PhantomJS' ],

    plugins : ['karma-jasmine', 'karma-phantomjs-launcher']

  });
};
