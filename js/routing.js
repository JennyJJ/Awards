four51.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.
		when('/redeem', { templateUrl: 'partials/awardsView.html', controller: 'AwardsCtrl' }).
		otherwise({redirectTo: '/redeem'});
}]);