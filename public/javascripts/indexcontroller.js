
var app = angular.module('picpop', []);

app.controller('MainCtrl', function($scope, $window) {
    $scope.firstName = "Eshan";
    $scope.lastName = "Doe";

    $scope.authenticate = function() {
    	loginWindow = $window.open("https://api.instagram.com/oauth/authorize/?client_id=d020ad35b9014622b589d19a6d1130eb&redirect_uri=http://localhost:3000/igcallback&response_type=token", "_blank");

        loginWindow.addEventListener('loadstart', function (event) {

            hasToken = event.url.indexOf('access_token=');
            
            if(hasToken > -1) {
                console.log("found token");
                code = event.url.match("access_token=(.*)")[1];
                console.log(code);
                loginWindow.close();
            } 
        })
    }
});