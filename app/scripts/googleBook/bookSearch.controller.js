'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.controller:BookSearchCtrl
 * @description
 * # BookSearchCtrl
 * Controller of the biblioGopApp
 */
angular.module('biblioGopApp')
  .controller('BookSearchCtrl', function ($scope, Books, BookSearch, ngNotify) {
        $scope.isbnId = null;
        $scope.book = [];

        $scope.search = function(e,isbnId){
          if(isbnId && e.keyCode == 13){
            $scope.book = {};
            $scope.book = BookSearch.get({ISBN : isbnId});
          }
        };

        $scope.addBook = function(book){
          Books.create(book).then(function(){
            ngNotify.set("Thanks for help  !", {type:'success'});
          }).catch(function(){
            ngNotify.set("Error !", {type:'warning'});
          });
        }
  });
