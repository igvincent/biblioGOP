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
    var defaults = {
      hmlimit: 100,
      hmMoreText: 'read more',
      hmLessText: 'read less'
    };
    return {
      restrict:'AE',
      scope:{
        hmtext : '@',
        hmlimit : '@',
        hmMoreText: '@',
        hmLessText: '@'
      },
      templateUrl: 'scripts/utils/readMore.html',
      require: 'readMore',
      controller : function(){
        var self = this;
        self.collapsed = true;

        self.toggle = function(){
          self.collapsed = !self.collapsed;
        }
      },
      controllerAs: 'controller',
      link: function(scope, element, attrs, controller) {

        scope.options = angular.extend(defaults, scope);

        if (attrs.hmFullText == 'true') {
          controller.toggle();
        }
      }
    };
});
