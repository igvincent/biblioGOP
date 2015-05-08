'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.directive:NavbarDirective
 * @description
 * # Navbar
 * Directive of the navbar
 */

angular.module('biblioGopApp')
  .directive('navbar', function() {
    return {
      restrict: 'AE',
      templateUrl: 'scripts/navbar/navbar.html',
      controller: function ($scope, $location) {
        $scope.isActive = function(viewLocation){
          return viewLocation === $location.path();
        }
      }
    };
  }).filter('capitalize', function() {
    //Function to have a beautiful Uppercase in the name profile
    return function(input, all) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g,
        function(txt){return txt.charAt(0).toUpperCase()
          + txt.substr(1).toLowerCase();
        }) : '';
    }
  });
