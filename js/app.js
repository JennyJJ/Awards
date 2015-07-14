'use strict';

var four51 = {};
four51.app = angular.module('451order', ['ngResource', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ngTouch', 'ui.validate', 'ui.mask', 'headroom', 'ui.bootstrap', 'angulartics',
	'angulartics.google.analytics', 'OrderCloud-ProductZoom']);

four51.app.run(['$cookieStore', function($cookieStore) {
	$cookieStore.remove('user.awards');
	store.clear();
}]);