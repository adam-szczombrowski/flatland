# Timeline

This is the web version of great board game - Timeline. Since I got interested in AngularJS I wanted to build something with it. Have I learned more about Angular I would have known it's not a good idea to create a game with it. Unfortunatelly I learned it after the fact. So here it is: Timeline game.

## Rules

Rules are simple: you have to place the card with invention on it in a correct place on timeline. Every turn you get the random card and several slots to place it. If you place it correctly you gain 1 point if not you gain 0 points.

## AngularJS and Rails

I wanted to use Rails for backend and learn how to put two of those together. Good resource for start was book `AngularJS with Ruby on Rails` by David Bryant Copeland. I created the skeleton of my app following instructions in the book. I think that ideally I would like to have two separate applications: AngularJS for front-end and Rails API for backend. But again: I didn't know much about Angular back then.

## Router, Services and Directives

After completing course about Angular on CodeSchool I had nice overview on Angular components but wasn't sure how to put them all together.

### Router

I wanted only two views for the user: welcome screen with game rules and game itself. I accomplished it with following code:

```javascript
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
```  

For Rails router:
```ruby
Rails.application.routes.draw do
  resources :cards, only: [:index, :new, :create]
  root 'home#index'
  get "/*" => "home#index"
end
```

`get "/*" => "home#index"` line redirects all paths to `home#index` which allows whole Angular app to render and for Angular router to work.

### Services

I only needed one service for getting all the cards from the database. I accomplished it this way:

```javascript
var timelineServices = angular.module('timelineServices', []);

timelineServices.factory('Cards', ['$resource', function($resource){
  return $resource('/cards.json');
}]);
```

### Directives

For directives I used simple element directives, nothing fancy here:

```javascript
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
```

## Wrapping up

I had lots of fun and learned a lot doing this project. At least I know that I shouldn't use Angular for making a game (even as simple as this one). You can view whole source code for it on my [github](http://github.com/adam-szczombrowski).
