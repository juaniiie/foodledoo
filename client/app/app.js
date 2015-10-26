
var app = angular.module('foodle', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/templates/home.html',
    controller: 'HomeController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/templates/login.html',
    controller: 'AuthController',
    controllerAs: 'auth',
    onEnter: ['$state', 'Auth', function($state, Auth) {
      if (Auth.auth.isLoggedIn()) {
        $state.go('cookbook');
      }
    }]
  })
   .state('register', {
    url: '/register',
    templateUrl: 'app/templates/register.html',
    controller: 'AuthController',
    controllerAs: 'auth',
    onEnter: ['$state', 'Auth', function($state, Auth) {
      if (Auth.auth.isLoggedIn()) {
        $state.go('cookbook');
      }
    }]
  })
  .state('cookbook', {
    url: '/cookbook',
    abstract: true,
    templateUrl: 'app/templates/cookbook.html',
    controller: 'CookbookController',
    controllerAs: 'cookbook',
    onEnter: ['$state', 'Auth', '$timeout', function($state, Auth, $timeout) {
      if (!Auth.auth.isLoggedIn()) {
        $timeout(function() {
          $state.go('login');
        });
      }
    }]
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
