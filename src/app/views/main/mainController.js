(function() {
	'use strict';

	function MainController(
		$scope
	){
	
		function init(){
			$scope.test = 'teste';
		}

		init();
	}

	angular.module('app')
		.controller('mainController', ['$scope', MainController]);

})();
