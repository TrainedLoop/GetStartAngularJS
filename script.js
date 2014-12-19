(function() {
  var app = angular.module("githubViewer", []);
  var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {
    //configs
    $scope.countdown = 5;
    $scope.repoOrder ="+name";


    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };
    
    var onRepos= function (data) {
      $scope.repos = data;
      $log.info("teste" +  JSON.stringify(data));
      $log.info("Scrolling for result");
      $location.hash("userDetails");
      $anchorScroll();
    };
    
    
    var onError = function(reason) {
      $scope.error = "couldt not fetch data";
      $scope.user = null;
    };


    var decrementCountdown = function(){
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
      $scope.error=null;
      github.getUser(username).then(onUserComplete, onError);

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