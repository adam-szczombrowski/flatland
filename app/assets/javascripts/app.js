(function(){
var controllers, app;

app = angular.module('store', ['templates', 'ngRoute', 'controllers']);

app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "index.html",
      controller: 'StoreController'
    });
  }
]);

controllers = angular.module('controllers', []);

controllers.controller("StoreController", ['$scope', function($scope) {
  this.products = gems;

}]);

controllers.controller("PanelController", ['$scope', function($scope) {
  this.tab = 1;

  this.selectTab = function(setTab){
    this.tab = setTab;
  };

  this.isSelected = function(checkTab){
    return this.tab === checkTab;
  };
}]);

controllers.controller('ReviewController', ['$scope', function($scope) {
  this.review = {};
  this.addReview = function(product){
    product.reviews.push(this.review);
    this.review = {};
    reviewForm.$setPristine();
  };
}]);

var gems = [{name: 'Dodecahedron', price: 2.9, description: '...', canPurchase: true, soldOut: true, reviews: [{stars: 5, body: 'Nice gem', author: 'Adam'} ]},
            {name: 'Pentagonal Gem', price: 5.95, description: '...', canPurchase: false, soldOut: false}]

})();
