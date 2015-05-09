'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.factory:BookSearch
 * @description
 * # Books
 * BookSearch factory of the biblioGopApp
 */

angular.module('biblioGopApp')
  .factory('BookSearch', function ($resource) {
    return $resource('https://www.googleapis.com/books/v1/volumes?q=isbn::ISBN', {}, {
      'get': {
        method: 'GET',
        transformResponse: function (data) {
          data = angular.fromJson(data);
          var response;
          if(data.items){
            //Only one response is available for a ISBN
            response = {
              title : data.items[0].volumeInfo.title,
              authors : data.items[0].volumeInfo.authors,
              publisher : data.items[0].volumeInfo.publisher,
              description : data.items[0].volumeInfo.description,
              pageCount : data.items[0].volumeInfo.pageCount,
              borrow : false,
              since : new Date().toLocaleString(),
              borrower : null
            };
          }
          return response;
        }
      }
    });
  });
