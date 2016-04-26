(function() {
	function Routes($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider, $locationProvider) {
		$stateProvider
			.state('App', {
				abstract: true,
				templateUrl: '/app/views/main/mainTemplate.html',
				controller: 'mainController'
			})
			.state({
				name: 'App.home',
				abstract: true,
				views: {
					'main@App': {
						templateUrl: '/app/views/home/homeTemplate.html',
						controller: 'homeController'
					}
				}
			})
			.state({
				name: 'App.home.index',
				url: '/home',
				views: {
					'home@App.home': {
						templateUrl: '/app/views/home/index/homeIndexTemplate.html',
						controller: 'homeIndexController'
					}
				}
			})
			.state({
				name: 'App.home.test',
				url: '/test',
				views: {
					'home@App.home': {
						templateUrl: '/app/views/home/test/homeTestTemplate.html',
						controller: 'homeTestController'
					}
				}
			});

		$urlRouterProvider.otherwise('/home');
		$locationProvider.html5Mode(true);
	}

	angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$httpProvider', '$locationProvider', Routes]);

})();