// Code goes here

(function() {
  var app = angular.module("githubViewer", []);
  var MainController = function($scope, $http, $interval, $log) {

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url).then(onRepos, onError);
    };
    
    var onRepos= function (response) {

      $scope.repos = response.data;
    };
    
    
    var onError = function(reason) {
      $scope.error = "couldt not fetch data";
      $scope.user = null;
    };
    $scope.search = function(username) {
      $log.info("Searching for "+ username)
      $scope.error="";
      $http.get("https://api.github.com/users/"+username).then(onUserComplete, onError);
    };

    var decrementCountDown = function()
    {
      $scope.countDown -= 1;
      if($scope.countDown < 1){
        $scope.search($scope.username);
      }

    };

    var startCountDown = function(){
      $interval(decrementCountDown, 1000, 5, $scope.countDown);
    };


    
    $scope.repoOrder ="+name";
    $scope.countDown = 5;
    startCountDown();

  };
  app.controller("MainController", MainController);
}());