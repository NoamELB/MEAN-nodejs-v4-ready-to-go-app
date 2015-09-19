(function(){
	'use strict';

	angular
		.module('app.main')
		.service('TryOut', TryOut);

		TryOut.$inject = ['$resource', '$q'];

		function TryOut ($resource, $q) {
			var url = $resource('data/tryOut');
			return function () {
				return new $q(function (resolve, reject) {
					url.get({}, function (d) {
						if (!d || d.error)
							reject("error: " + ((d) ? d.error : ""));
						else resolve(d);
					})
				});
			}
		}
})();