'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.factory:Books
 * @description
 * # Books
 * Books factory of the biblioGopApp
 */

angular.module('biblioGopApp')
  .factory('Books', function($firebaseArray, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var books = $firebaseArray(ref);

    return {
    all: function () {
      return books;
    },
    create: function (book) {
      return books.$add(book);
    },
    update: function (book) {
      return books.$save(book);
    },
    delete: function (book) {
      return books.$remove(book);
    }
  };
});
