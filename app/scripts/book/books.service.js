'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.factory:Books
 * @description
 * # Books
 * Books factory of the biblioGopApp
 */

angular.module('biblioGopApp')
  .factory('Books', function($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var books = $firebase(ref.child('books')).$asArray();
  var Book = {
    all: function () {
      return books;
    },
    create: function (book) {
      return books.$add(book);
    },
    get: function (bookId) {
      return $firebase(ref.child('books').child(bookId)).$asObject();
    },
    update: function (bookId, book) {
        return ref.child('books').child(bookId).set(book);
    },
    delete: function (book) {
      return books.$remove(book);
    }
  };
  return Book;
});
