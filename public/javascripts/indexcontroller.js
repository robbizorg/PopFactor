
var app = angular.module('picpop', ["chart.js"]);

app.config(['ChartJsProvider', function(ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });

}])
app.controller('MainCtrl', function($scope, $window, $http, $location) {
    $scope.showingVar = false;
  $scope.labels = ['blue', 'red', 'teal', 'grey', 'black'];
  $scope.series = ['Series A'];

  $scope.info = [
    [6, 5, 8, 1, 5]
  ];

    $scope.authenticate = function() {

        $scope.id = $scope.generateKey();
        console.log("generated scope id " + $scope.id);

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

              loginWindow = $window.open("https://api.instagram.com/oauth/authorize/?client_id=d020ad35b9014622b589d19a6d1130eb&redirect_uri=http://localhost:3000/igcallback&response_type=code&scope=likes+comments+public_content");

                setTimeout(function () {
                    console.log("Timeout called");
                    //$scope.analyze();
                    $scope.analyzeTags();
                    console.log("Analyzed Finished, onto next")
                    //$scope.labels = $scope.generateLabels($scope.colors);
                    //$scope.series = ['Series A'];
                    //console.log("Colors " + $scope.colors);

                    //$scope.info = $scope.generateInfo($scope.colors);

                    //$scope.changeViewtoAnalysis();
                    loginWindow.close();           
                }, 5000);

            });

          
        
   



 
        /*
        setTimeout(function () {
            loginWindow.close();
        }, 10000);
        */  
    }

    $scope.analyze = function() {

        $scope.pictures = [];
        console.log("analyzing scope id " + $scope.id);

         $http({
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
          }).then( function (body) {
              /*NO ERROR CHECKING BUILT IN YET */
              //console.log("this is what was returned " + body);
              //console.log("returned stuff " + JSON.stringify(body));

              data = JSON.parse(JSON.stringify(body));
              //console.log("returned stuff " + data);
              //console.log("data.data " + JSON.stringify(data.data.data[1]));
              jsonData = JSON.stringify(body);
              data = JSON.parse(jsonData);
              //console.log(data);
              //console.log(data.data.data);
              $scope.pictures = data.data.data;

                       // Must Run the following the code for every single picture
                var colorFreq = {}; //keeping weight
                var colorCount = {}; //keeping occurrences
                var finalColorWeight = {}; //final value will be colorFreq[x]/colorCount[x]
                //console.log("pictures: " + $scope.pictures);
                //For each picture adjust Color Frequency
                $scope.pictures.forEach (function(picture) {
                    //for (i = 0; i < $scope.pictures.length; i++){
                    //console.log("picture: " + picture);
                    var likes = picture[0];
                    var colors = picture[1]; //list of colors in picture

                    colors.forEach(function(color){
                        if (colorFreq[color[0]] != undefined){
                                colorFreq[color[0]] += color[1]*likes/100.0;
                                colorCount[color[0]] +=1;
                        } else{
                            colorFreq[color[0]] = color[1]*likes/100.0;
                            colorCount[color[0]] = 1;
                        }
                    });

                });

                //For each color set final color weight
                for(var color in colorFreq){
                    finalColorWeight[color] = colorFreq[color]/colorCount[color];
                }

                console.log(finalColorWeight);

                var labels = $scope.generateLabels(finalColorWeight);
                var info = $scope.generateInfo(finalColorWeight);

                console.log("LAbels before " + $scope.labels);
                $scope.labels = labels;
                $scope.info = info;

                console.log("labels after + " + $scope.labels);
        
                $scope.showingVar = true;
                console.log($scope.info);
                console.log($scope.labels);
                $scope.getName();
                

            });


       
        return "";
    };

    $scope.getName = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getName',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },

            //data:  {
            //    userID: $scope.id
            //}
          }).then( function (response) {
              /*NO ERROR CHECKING BUILT IN YET */
              $scope.userName = response.data;
        })
    }

    $scope.generateKey = function() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var result = '';
        for (var i = 10; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    $scope.generateLabels = function(colors) {
        var arr = [];
        for (var key in colors) {
            arr.push(key);
        };

        return arr;
    }

    $scope.generateInfo = function(colors) {
        var arr = [];
        for (var key in colors) {
            //console.log(colors[key]);
            arr.push(colors[key]);
        }
        var wrapper = [arr];
        console.log(wrapper);

        return wrapper;
    }

    $scope.changeViewtoAnalysis = function() {
      $location.path('/analysis');
    }

    $scope.analyzeTags = function() {
        $http({
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
          }).then( function (body) {
                jsonData = JSON.stringify(body);
                data = JSON.parse(jsonData);

                console.log(data);

                $scope.pictures = data.data.data;
                var tags = picture[2];
                console.log(tags);
          }
    }
});


