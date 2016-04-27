var timelineDirectives = angular.module('timelineDirectives', []);

timelineDirectives.directive('topPanel', function(){
  return {
    restrict: 'E',
    templateUrl: '/assets/partials/top-panel.html'
  };
});

timelineDirectives.directive('leftArrow', function(){
  return {
    restrict: 'E',
    templateUrl: '/assets/partials/left-arrow.html'
  };
});

timelineDirectives.directive('rightArrow', function(){
  return {
    restrict: 'E',
    templateUrl: '/assets/partials/right-arrow.html'
  };
});
