'use strict';

/**
 * @ngdoc function
 * @name biblioGopApp.directive:readMore
 * @description
 * # readMore
 * Directive of ReadmeMore functionality
 */

angular.module('biblioGopApp')
  .directive('readMore', function () {
  return {
    restrict:'AE',
    scope:{
      hmtext : '@',
      hmlimit : '@',
      hmfulltext:'@',
      hmMoreText:'@',
      hmLessText:'@',
      hmMoreClass:'@',
      hmLessClass:'@'
    },
    templateUrl: 'scripts/utils/readMore.html',
    controller : function($scope){
      $scope.toggleValue=function(){

        if($scope.hmfulltext == true)
          $scope.hmfulltext=false;
        else if($scope.hmfulltext == false)
          $scope.hmfulltext=true;
        else
          $scope.hmfulltext=true;
      }
    }
  };
});
