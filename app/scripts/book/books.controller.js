'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.controller:Books
 * @description
 * # BooksCtrl
 * Controller of the biblioGopApp
 */
angular.module('biblioGopApp')
  .controller('BooksCtrl', function ($scope, Books, ngNotify) {
    $scope.books = Books.all();
    $scope.showAddComment = false;
    $scope.bookYouCanComment = [];

    $scope.delBook = function(book){
      Books.delete(book).then(function(){
        ngNotify.set("I'm sorry for this book !", {type:'success'});
      }).catch(function(){
        ngNotify.set("Error !", {type:'warning'});
      });
    };

    $scope.borrowBook = function(e,book){
      if(e.keyCode == 13){
        book.borrow = true;
        book.since = new Date().toLocaleDateString();
        Books.update(book)
          .then(function(){
            ngNotify.set("Thanks " + book.borrower + " !", {type:'success'});
          }).catch(function(){
            ngNotify.set("Error " + book.borrower + " !", {type:'warning'});
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
        ngNotify.set("Please " + notify + " comment your book!", {type:'success'});
        $scope.bookYouCanComment.push(book);
      }).catch(function(){
        ngNotify.set("Error " + notify + " !", {type:'warning'});
      });
    };

    $scope.addComment = function(e,book){
      if(e.keyCode == 13) {
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
              ngNotify.set("Thanks " + peopleWhoComment + " for comment !", {type:'success'});
              $scope.bookYouCanComment.splice(book);
            }).catch(function(){
              ngNotify.set("Error " + peopleWhoComment + " !", {type:'warning'});
            });
        }
      }
    }
  });
