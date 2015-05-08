'use strict';

/**
 * @ngdoc overview
 * @name biblioGopApp
 * @description
 * # biblioGopApp
 *
 * Main module of the application.
 */
angular
  .module('biblioGopApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
