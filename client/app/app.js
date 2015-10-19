
var app = angular.module('foodle', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/templates/home.html',
    controller: 'HomeController'
  })
    .state('auth', {
    url: '/auth',
    templateUrl: 'app/templates/auth.html',
    controller: 'AuthController',
    controllerAs: 'auth'
  })
  .state('cookbook', {
    url: '/cookbook',
    abstract: true,
    templateUrl: 'app/templates/cookbook.html',
    controller: 'CookbookController',
    controllerAs: 'cookbook'
  })
  .state('cookbook.viewrecipes', {
    url: '',
    templateUrl: 'app/templates/view-recipes-cookbook-partial.html'
  })
  .state('cookbook.addrecipe', {
    url: '',
    templateUrl: 'app/templates/add-recipes-cookbook-partial.html'
  });

});
