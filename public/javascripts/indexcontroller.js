
var app = angular.module('picpop', []);

app.controller('MainCtrl', function($scope, $window) {
    $scope.firstName = "Eshan";
    $scope.lastName = "Doe";

    $scope.authenticate = function() {
    	loginWindow = $window.open("https://api.instagram.com/oauth/authorize/?client_id=d020ad35b9014622b589d19a6d1130eb&redirect_uri=http://localhost:3000/igcallback&response_type=code&scope=likes+comments+public_content");

        setTimeout(function () {
            loginWindow.close();
        }, 3000);
            
    }
});


