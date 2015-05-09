'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.controller:Books
 * @description
 * # BooksCtrl
 * Controller of the biblioGopApp
 */
angular.module('biblioGopApp')
  .controller('BooksCtrl', function ($scope, Books) {
        $scope.books = Books.all();

        $scope.delBook = function(book){
          Books.delete(book);
        }


  });
