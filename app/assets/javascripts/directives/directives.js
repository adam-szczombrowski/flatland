var timelineDirectives = angular.module('timelineDirectives', []);

timelineDirectives.directive('topPanel', function(){
  return {
    restrict: 'E',
    templateUrl: 'top-panel.html'
  };
});

timelineDirectives.directive('leftArrow', function(){
  return {
    restrict: 'E',
    templateUrl: 'left-arrow.html'
  };
});

timelineDirectives.directive('rightArrow', function(){
  return {
    restrict: 'E',
    templateUrl: 'right-arrow.html'
  };
});
