(function(){
  var app = angular.module('timeline',['templates','ngRoute','ngResource', 'timelineServices', 'timelineDirectives']);

  app.config(['$routeProvider', Router]);

  function Router($routeProvider){
    $routeProvider.
    when('/', {
      templateUrl: 'welcome.html'
    }).
    when('/game', {
      templateUrl: 'game.html',
      controller: 'GameController'
    }).
    otherwise({ redirectTo: '/' });
  }

  app.controller('GameController', ['$window','$scope', 'Cards', function($window, $scope, Cards){
    function init(){
      $scope.cards = [];
      $scope.visibleIndex = 0;
      $scope.points = 0;
      $scope.gameCards = Cards.query(function(){
        console.log($scope.gameCards);
        $scope.cards.push({});
        $scope.cards.push(getNewCard($scope.gameCards));
        $scope.cards.push({year: $scope.cards[1].year + 1});
        $scope.cards[0].year = $scope.cards[1].year - 1;
        $scope.currentCard = getNewCard($scope.gameCards);
      });
    }

    init();
    $scope.selectPlace = function(year){
      var index = findCardWithYear($scope.cards, year);
      var currentYear = $scope.currentCard.year;
      var success = false;
      if(index == 0){
        if(currentYear <= year)
        {
          $scope.cards.splice(index, 0, $scope.currentCard);
          $scope.cards.splice(index, 0, {year: currentYear - 1});
          success = true;
        }
      }
      else if (index == $scope.cards.length -1 ) {
        if(currentYear >= year)
        {
          $scope.cards.splice(index+1, 0, $scope.currentCard);
          $scope.cards.push({year: currentYear + 1});
          success = true;
        }
    }else{
        if(currentYear >= $scope.cards[index-1].year && currentYear <= $scope.cards[index+1].year)
        {
          $scope.cards.splice(index+1, 0, $scope.currentCard);
          $scope.cards.splice(index+2, 0 ,{year: currentYear + 1});
          success = true;
        }
      }
      if(success)
      {
        $scope.points += 1;
        $('.correct').toggleClass('hidden');
        $('.correct').animate({fontSize: '34px'}, 500).animate({fontSize: '28px'}, 500);
        setTimeout(function(){
          $('.correct').toggleClass('hidden');
        }, 1000);
          if($scope.points == 6)
        {
          alert('Congratulations! You won!');
          $window.location.href = '/';

        }
      }
      else{
        $('.wrong').toggleClass('hidden');
        $('.wrong').animate({fontSize: '34px'}, 500).animate({fontSize: '28px'}, 500);
        setTimeout(function(){
          $('.wrong').toggleClass('hidden');
        }, 1000);
      }
      $scope.currentCard = getNewCard($scope.gameCards);
    };
    $scope.arrowVisible = function(direction){
      if($scope.cards.length > 7)
      {
        if(direction == 'left' && $scope.visibleIndex != 0 )
        {return true;}
        if(direction == 'right' && $scope.visibleIndex + 7 != $scope.cards.length)
        {return true;}
      }
    }
    $scope.clickArrow = function(direction){
      if(direction == 'left')
      {
        $scope.visibleIndex -= 1;
      }
      else{
        $scope.visibleIndex += 1;
      }
    }
  }]);

  // looks for the index of a card with given year
  function findCardWithYear(cards, year){
    for(var i = 0; i <cards.length ; i++)
    {
      if(cards[i].year == year)
      {
        return cards.indexOf(cards[i]);
      }
    }
  }
  // gets random card from a deck
  function getNewCard(cards){
    var index = Math.floor(Math.random() * (cards.length));
    var new_card = cards[index];
    if (index > -1 ){
      cards.splice(index,1);
    }
    return new_card;
  }

})();
