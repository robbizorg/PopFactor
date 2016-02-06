
var app = angular.module('picpop', []);

app.controller('MainCtrl', function($scope) {
    $scope.firstName = "Eshan";
    $scope.lastName = "Doe";
    console.log("in controller");
});

console.log("in controller outside of function");