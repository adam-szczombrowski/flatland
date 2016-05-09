var timelineServices = angular.module('timelineServices', []);

timelineServices.factory('Cards', ['$resource', function($resource){
  return $resource('/cards.json');
}]);
