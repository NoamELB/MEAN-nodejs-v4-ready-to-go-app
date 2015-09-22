(function(){
	'use strict';

	angular
		.module('app.main')
		.controller('MainCtrl', MainCtrl);

		MainCtrl.$inject = ['$scope', 'TryOut'];

		function MainCtrl ($scope, TryOut) {
			let vm = this;

			vm.imgUrl = 'http://i.imgur.com/MQHYB.jpg'
			vm.trying = trying;

			function trying () {
				TryOut()
					.then(function(d) {
						console.log(d);
					})
					.catch(function(e) {console.log(e)});
			}
		}
})();