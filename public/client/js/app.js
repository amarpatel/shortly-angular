angular.module('shortly', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../client/templates/home.html',
      controller: 'linkController'
    })
    .when('/create', {
      templateUrl: '../client/templates/shorten.html',
      controller: 'shortenController'  
    }).otherwise({redirectTo: '/'});
}])
.controller('linkController', ['$scope', 'Links', function ($scope, Links) {
  Links.getLinks().then(function (promise){
    $scope.links = promise.data;
  });
}])
.controller('shortenController', ['$scope','Links', function ($scope, Links) {
  $scope.post = function () {
    Links.sendLink($scope.shortenLink).then(function (data) {
      $scope.shortenedLink = data.data
    });
  };
}])
.factory('Links', function ($http) {
  return {
    getLinks: function () {
      return $http({
        method: 'GET',
        url: '/links'
      }).success(function (data, status) {
        return data;
      }).error(function () {
        console.log('error!');
      })
    },
    sendLink: function (url) {
      console.log(url)
      return $http({
        method: 'POST',
        url: '/links',
        data: {url: url}
      }).success(function (data, status) {
        return data;
      }).error(function () {
        console.log('error!');
      })
    }
  }
})
.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
      a = a[attribute];
      b = b[attribute];
      if (typeof a === 'number') {
        return b - a;
      } else {
        return (a > b);
      }
    });
    return array;
 }
})