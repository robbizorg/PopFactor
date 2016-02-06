
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

        $scope.pictures = [];

        http({
            method: 'GET',
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
          }).then( function (resp) {
              /*NO ERROR CHECKING BUILT IN YET */
              data = body;
              console.log("got color data from database");
              $scope.pictures = resp.data;
          });


        // Must Run the following the code for every single picture
        var colorFreq = [];
        var colorCount = [];

        $scope.pictures.forEach (function(picture) {
            for (i = 0; i < $scope.pictures.length; i++){
                // Likes: $scope.pictures[i][0]
                var likes = $scope.pictures[i][0];
                // Colors: $scope.pictures[i][1]
                var colors = $scope.pictures[i][1];

                // Checking for duplicates
                if (colors[0] in colorFreq == false){
                    // Multiply the following by likes
                    colorFreq[colorList[i][0]] = colorList[i][1];
                }
            
                // Checking for duplicates
                if (colorList[i][0] in colorCount == false){
                    colorCount[colorList[i][0]] = 1;
                }
            
                // Color Frequency = 
                else{
                    // Following: Sum of all the color frequncies of said color
                    colorFreq[colorList[i][0]] = colorFreq[colorList[i][0]] + colorList[i][1];
                    // Following: how many pictures a given color has been 
                    // predominant in
                    colorCount[colorList[i][0]] = colorCount[colorList[i][0]] + 1;
                }
            }
        });



    $scope.generateKey = function() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var result = '';
        for (var i = 10; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }


});


