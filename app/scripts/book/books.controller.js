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
    };

    $scope.borrowBook = function(e,book){
      if(e.keyCode == 13){
        book.borrow = true;
        book.since = new Date().toLocaleDateString();
        Books.update(book);
      }
    };

    $scope.returnBook = function(book){
        book.borrower = null;
        book.borrow = false;
        book.since = new Date().toLocaleDateString();
        Books.update(book);
    }


  });
