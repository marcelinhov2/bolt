(function() {
	function App() {
		return [
			'templates',
			'ui.router',
			'ngResource'
		];
	}

	angular
		.module('app', App());

})();