(function ($) {
	'use strict';
    
    var weatherApp = angular.module('weatherApp', ['WeatherService']);
    
    weatherApp.controller('WeatherCtrl', ['$scope', 'OpenMap', function ($scope, OpenMap) {
        $scope.currWeather = {
            city: '',
            temp: '',
            conditions: ''
        };
        
        $scope.getWeather = function() {
            OpenMap.getWeather($scope.inputlocation).then(function(data) {
                $scope.currWeather.city = data.data.name;
                $scope.currWeather.temp = Math.ceil((9/5*(data.data.main.temp  - 273))+32) + String.fromCharCode(176) + "F" + " / " + 
                                          Math.ceil(data.data.main.temp  - 273.15) + String.fromCharCode(176) + "C";
                $scope.currWeather.conditions = data.data.weather[0].description;

            });
        };
    }]);
    
    weatherApp.directive('weatherIcon', function() {
        return {
            restrict: 'E, A',
            replace: false,
            scope: {
                conditions: '@'
            },
            link: function(scope, element, attr){
                scope.$watch('conditions', function(newValue,oldValue) {
                    scope.iconclass = "";
                    switch(scope.conditions) {
                      case "clear sky":
                          scope.iconclass = "sun";
                          break;
                      case "scattered clouds":
                          scope.iconclass = "scat-cloud";
                          break;
                      case "overcast clouds":
                          scope.iconclass = "few-cloud";
                          break; 
                      case "broken clouds":
                          scope.iconclass = "brok-cloud";
                          break;
                      case "few clouds":
                          scope.iconclass = "few-cloud";
                          break;
                      case "shower rain":
                          scope.iconclass = "shower-rain";
                          break;
                      case "light rain":
                          scope.iconclass = "lt-rain";
                          break;
                      case "moderate rain":
                          scope.iconclass = "lt-rain";
                          break;
                      case "haze":
                         scope.iconclass = "haze";
                          break;
					  case "fog":
                          scope.iconclass = "fog";
                          break;
				      case "snow":
					      scope.iconclass = "snow";
						  break;
				      case "light rain and snow":
					      scope.iconclass = "snow";
						  break;
					  case "thunderstorm":
					      scope.iconclass = "thunder";
						  break;
                      default:
                          scope.iconclass = "noicon";
                  }
             
              });
              
            },
            template: '<div class="weather-icon {{iconclass}}"></div>'
        };
    });
    
    angular.module('WeatherService', [])
    
    .factory('OpenMap', ['$http', function ($http) {
        var services = {};
        services.getWeather = function(location) {
            var restUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location;
            var appid = "&appid=fd61eab401147e78b825c2f71cdea941";
            return $http.get(restUrl + appid);
        }
        
        return services;
    }]);
    
}());

//ex: rest URL
/* http://api.openweathermap.org/data/2.5/weather?q=san francisco,ca */

//ex JSON response
/*
{"coord":{"lon":139,"lat":35},
"sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
"weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
"wind":{"speed":7.31,"deg":187.002},
"rain":{"3h":0},
"clouds":{"all":92},
"dt":1369824698,
"id":1851632,
"name":"Shuzenji",
"cod":200}
*/

// K to F conversion: F = 9/5(K - 273) + 32

/* $(".btn").click(function() {
    getWeather();
});

$("input#enter-location").focus(function() {
    $('.error').css('display','none');
});
  
function getWeather() {
  
	var restUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
	var loc = $("#enter-location").val();
	restUrl = restUrl + loc;

	$.get(restUrl).done(function(data) {
		  var city = data.name,
			  description = data.weather[0].description,
			  temp = Math.ceil((9/5*(data.main.temp  - 273))+32);
				
		$('#city .result').text(city);
		$('#temperature .result').text(temp);
		$('#description .result').text(description);
			
	}).fail(function(data) {
        // display error message if rest call fails
        $('.error').css('display','block').text('System error - please try again later.');
    });
	
} */