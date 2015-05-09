'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.controller:BookSearchCtrl
 * @description
 * # BookSearchCtrl
 * Controller of the biblioGopApp
 */
angular.module('biblioGopApp')
  .controller('BookSearchCtrl', function ($scope, Books, BookSearch) {
        $scope.isbnId = null;
        $scope.book = [];

        $scope.search = function(isbnId){
          if(isbnId){
            $scope.book = {};
            $scope.book = BookSearch.get({ISBN : isbnId});
          }
        };

        $scope.addBook = function(book){
          Books.create(book);
        }
  });
