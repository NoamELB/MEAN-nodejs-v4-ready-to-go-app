(function(){
	'use strict';

	angular
		.module('app.main')
		.config(routes);

		routes.$inject = ['$stateProvider'];

		function routes ($stateProvider) {
			$stateProvider
			    .state('landing', {
			    	url: '/',
			   		templateUrl: 'assets/packages/main/partials/landing.html',
			    	controller: "MainCtrl",
			    	controllerAs: "vm"
		    	});
				
			$stateProvider
			    .state('landing2', {
			    	url: '/2',
			   		templateUrl: 'assets/packages/main/partials/landing2.html',
			    	controller: "MainCtrl",
			    	controllerAs: "vm"
		    	});
		}
})();