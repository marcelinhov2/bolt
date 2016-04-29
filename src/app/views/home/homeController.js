(function() {
	'use strict';

	function HomeController(
		$scope
	) {
		function init() {
			// @if NODE_ENV='testing'
			$scope.test = 'testing';
			// @endif 

			// @if NODE_ENV='production'
			$scope.test = 'production';
			// @endif 
		}

		init();
	}

	angular.module('app').controller('homeController', ['$scope', HomeController]);

})();