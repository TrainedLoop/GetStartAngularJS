// Code goes here

(function() {
  var app = angular.module("githubViewer", []);
  var MainController = function($scope, $http, $interval, $log) {
    //configs
    $scope.countdown = 5;
    $scope.repoOrder ="+name";



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


    var decrementCountdown = function()
    {

      $scope.countdown -= 1;
      $log.info("decrementing countdown countdown valor: "+$scope.countdown);
      if($scope.countdown < 1){
        $log.info("Search");
        $scope.search($scope.username);
      }

    };

    var countdownInterval = null;
    var startCountDown = function(){
      $log.info("Starting countdown")
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown , $scope.countdown);
    };


    $scope.search = function(username) {
      $log.info("Searching for "+ username);
      $scope.error="";
      $http.get("https://api.github.com/users/"+username).then(onUserComplete, onError);

      if(countdownInterval){
        $log.info("Stoping countdown")
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

    startCountDown();

  };
  app.controller("MainController", MainController);
}());