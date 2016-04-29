(function() {
	'use strict';

	function HomeTestController(
		$scope
	) {
		function init() {
			$scope.test = 'home Test';
		}

		init();
	}

	angular.module('app').controller('homeTestController', ['$scope', HomeTestController]);

})();