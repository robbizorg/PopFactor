var app = angular.module('picpop', ['ui.router']);

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

/* Example Factory Code
app.factory('drafts', ['$http', function($http){
	// Service Body
	var o = {};
	// For some reason this wasn't working before, 
	// but specifying that o.drafts exists made it
	// work. Huh...
	o.drafts = [];

	o.getAll = function() {
		return $http.get('/drafts').success(function(data) {
			console.log('Success!!!! Line 35 angularApp.js');
			angular.copy(data, o.drafts);
			console.log(o.drafts);
		});
	};

	o.create = function(draft) {
		return $http.post('/drafts', draft).success(function(data) {
			o.drafts.push(data);
		});
	};

	o.upvote = function(draft) {
		return $http.put('/drafts/' + draft._id + '/upvote')
			.success(function(data){
				draft.upvotes += 1;
			});
	};

	o.get = function(id) {
		return $http.get('/drafts/' + id).then(function(res){
			return res.data;
		})
	};

	o.addComment = function(id, comment) {
		return $http.post('/drafts/' + id + '/comments', comment);
	};

	o.upvoteComment = function(draft, comment) {
		return $http.put('/drafts/' + draft._id + '/comments/' + comment._id + '/upvote')
			.success(function(data){
				comment.upvotes += 1;
			});
	};

	return o;
}]);
*/

app.controller('MainCtrl', [
	'$scope',
	// Add this in order to access the factory
	//'drafts',
	function($scope) {

	$scope.printHi = function() {
		console.log("Print Hi!");
	}
}]);

/* Example of another controller
app.controller('DraftsCtrl', [
	'$scope',
	'drafts',
	'draft',
	// Currently, the following doesn't work so well
	// I'm assuming that it's due to a lack of data
	// to deal with, so this is the flesh around
	// a skeleton that doesn't exist
	function($scope, drafts, draft) {
		$scope.draft = draft;

		$scope.addComment = function() {
			if ($scope.body === '') { return ; }

			drafts.addComment(draft._id, {
				body: $scope.body,
				author: 'user',

			}).success(function(comment) {
				$scope.draft.comments.push(comment);
			});

			$scope.body = '';
		}

		$scope.incrementUpvotes = function(comment) {
			drafts.upvoteComment(draft, comment);
		}
}]);
*/