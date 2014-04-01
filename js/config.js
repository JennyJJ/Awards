four51.app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(false);
}]);

four51.app.config(['$provide', function($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function($delegate, $injector) {
        return function $broadcastingExceptionHandler(ex, cause) {
            $delegate(ex, cause);
            $injector.get('$rootScope').$broadcast('exception', ex, cause);
        }
    }]);
}]);

four51.app.config(['datepickerConfig', 'datepickerPopupConfig', function(datepickerConfig, datepickerPopupConfig){
    datepickerConfig.showWeeks = false;
    datepickerPopupConfig.showButtonBar = false;
    datepickerPopupConfig.appendToBody = true;
}]);