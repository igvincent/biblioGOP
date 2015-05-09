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
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/main/main.html',
        controller: 'MainCtrl'
      }).when('/bookSearch', {
        templateUrl: 'scripts/googleBook/bookSearch.html',
        controller: 'BookSearchCtrl'
      }).when('/books', {
        templateUrl: 'scripts/book/books.html',
        controller: 'BooksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant('FIREBASE_URL','http://bibliogop.firebaseIO.com/books');


