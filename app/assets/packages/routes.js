(function(){
	'use strict';

	angular
		.module('app.module')
		.config(routes);

		routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

		function routes ($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise('/');
		    $locationProvider.html5Mode(true);
		}
})();