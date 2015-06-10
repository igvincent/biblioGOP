'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.controller:Books
 * @description
 * # BooksCtrl
 * Controller of the biblioGopApp
 */
angular.module('biblioGopApp')
  .controller('BooksCtrl', function ($scope, Books, Snackbar) {
    $scope.books = Books.all();
    $scope.showAddComment = false;
    $scope.bookYouCanComment = [];

    $scope.delBook = function(book){
      Books.delete(book).then(function(){
        Snackbar.create('I\'m sorry for this book !');
      }).catch(function(){
        Snackbar.create('Error !');
      });
    };

    $scope.borrowBook = function(e,book){
      if(e.keyCode === 13){
        book.borrow = true;
        book.since = new Date().toLocaleDateString();
        Books.update(book)
          .then(function(){
            Snackbar.create('Thanks ' + book.borrower + ' !');
          }).catch(function(){
            Snackbar.create('Error ' + book.borrower + ' !');
          });
      }
    };

    $scope.showAddComment = function(book){
      return !($scope.bookYouCanComment.indexOf(book) == -1);
    };

    $scope.returnBook = function(book){
      var notify = book.borrower;

      book.borrower = null;
      book.borrow = false;
      book.since = new Date().toLocaleDateString();
      book.count += 1;

      Books.update(book).then(function(){
        Snackbar.create('Please ' + notify + ' comment your book!');
        $scope.bookYouCanComment.push(book);
      }).catch(function(){
        Snackbar.create('Error ' + notify + ' !');
      });
    };

    $scope.addComment = function(e,book){
      if(e.keyCode === 13) {
        if(book.newComment.username && book.newComment.body) {
          var peopleWhoComment = book.newComment.username;
          if(book.comments){
            book.comments.push(book.newComment);
            book.newComment = null;
          }else {
            book.comments = [];
            book.comments.push(book.newComment);
            book.newComment = null;
          }
          Books.update(book)
            .then(function(){
              Snackbar.create('Thanks ' + peopleWhoComment + ' for comment !');
              $scope.bookYouCanComment.splice(book);
            }).catch(function(){
              Snackbar.create('Error ' + peopleWhoComment + ' !');
            });
        }
      }
    };
  });
