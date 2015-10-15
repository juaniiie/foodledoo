var app = angular.module('cookBook', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templeteUrl: 'index.html',
    controller: 'HomeController'
  })
  .state('auth', {
    url: '/auth',
    templeteUrl: 'auth.html',
    controller: 'AuthController'
  });

  // $urlRouterProvider.otherwise('/');

});


