/* var app = angular.module('picpop', []);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl',
			})

		$urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', [
	'$scope',
	// Add this in order to access the factory
	//'drafts',
	function($scope) {

	$scope.printHi = function() {
		console.log("Print Hi!");
	}
}]); */


/*
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
});

routerApp.controller('MainCtrl', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);
*/