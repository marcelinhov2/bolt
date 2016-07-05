(function() {
	'use strict';

	function testDirective() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: '/app/directives/test/testTemplate.html'
		};
	}

	angular.module('app')
		.directive('testDirective', [testDirective]);
})();