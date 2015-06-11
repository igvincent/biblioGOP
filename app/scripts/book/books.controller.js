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

    $scope.delBook = function (book) {
      Books.delete(book).then(function () {
        Snackbar.create('I\'m sorry for this book !');
      }).catch(function () {
        Snackbar.create('Error !');
      });
    };

    $scope.borrowBook = function (e, book,name) {
      if (e.keyCode === 13) {
        book.borrow = true;

        if (book.borrowers) {
          book.borrowers.push({
            name: name,
            date: new Date().toLocaleDateString()
          });
          book.newComment = null;
        } else {
          book.borrowers = [];
          book.borrowers.push({
            name: name,
            date: new Date().toLocaleDateString()
          });
          book.newComment = null;
        }

        Books.update(book)
          .then(function () {
            Snackbar.create('Thanks ' + name + ' !');
            book.newComment = null;
          }).catch(function () {
            Snackbar.create('Error ' + name + ' !');
            book.newComment = null;
          });
      }
    };

    $scope.returnBorrower=  function(book){
      return book.borrowers.slice(-1)[0];
    };

    $scope.showAddComment = function (book) {
      return !($scope.bookYouCanComment.indexOf(book) == -1);
    };

    $scope.returnBook = function (book) {
      var notify = book.borrowers.slice(-1)[0].name;

      book.borrower = null;
      book.borrow = false;
      book.since = new Date().toLocaleDateString();
      book.count += 1;

      Books.update(book).then(function () {
        Snackbar.create('Please ' + notify + ' comment your book!');
        $scope.bookYouCanComment.push(book);
      }).catch(function () {
        Snackbar.create('Error ' + notify + ' !');
      });
    };

    $scope.addComment = function (e, book) {
      if (e.keyCode === 13) {
        if (book.newComment.body) {
          var username = book.borrowers.slice(-1)[0].name;
          var comment = {
            username: username,
            body: book.newComment.body
          };

          if (book.comments) {
            book.comments.push(comment);
          } else {
            book.comments = [];
            book.comments.push(comment);
          }

          book.newComment = null;

          Books.update(book)
            .then(function () {
              Snackbar.create('Thanks ' + username + ' for comment !');
              $scope.bookYouCanComment.splice(book);
            }).catch(function () {
              Snackbar.create('Error ' + username + ' !');
            });
        }
      }
    };
  });
