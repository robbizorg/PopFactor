
var app = angular.module('picpop', []);

app.controller('MainCtrl', function($scope, $window, $http) {
    $scope.firstName = "Eshan";

    $scope.authenticate = function() {

        $scope.id = $scope.generateKey();

        $http({
            method: 'POST',
            url: 'http://localhost:3000/saveID',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },

            data:  {
                userID: $scope.id
            }
          }).then( function (body) {
              /*NO ERROR CHECKING BUILT IN YET */
              console.log("savedID in backend");
          });



    	loginWindow = $window.open("https://api.instagram.com/oauth/authorize/?client_id=d020ad35b9014622b589d19a6d1130eb&redirect_uri=http://localhost:3000/igcallback&response_type=code&scope=likes+comments+public_content");
        
        /*
        setTimeout(function () {
            loginWindow.close();
        }, 10000);
        */  
    }

    $scope.analyze = function() {

        var data;
        http({
            method: 'POST',
            url: 'http://localhost:3000/getColorData',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },

            data:  {
                userID: $scope.id
            }
          }).then( function (body) {
              /*NO ERROR CHECKING BUILT IN YET */
              data = body;
              console.log("got color data from database");
          });


        var colorFreq = {};
        var colorCount = {};

        for (i = 0; i < colorList.length; i++){
            
            if (colorList[i][0] in colorFreq == false){
                colorFreq[colorList[i][0]] = colorList[i][1];
            }
            
            if (colorList[i][0] in colorCount == false){
                colorCount[colorList[i][0]] = 1;
            }
            
            else{
                colorFreq[colorList[i][0]] = colorFreq[colorList[i][0]] + colorList[i][1];
                colorCount[colorList[i][0]] = colorCount[colorList[i][0]] + 1;
            }
        }
    }



    $scope.generateKey = function() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var result = '';
        for (var i = 10; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }


});


