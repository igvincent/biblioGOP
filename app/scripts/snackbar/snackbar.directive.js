'use strict';

angular.module('biblioGopApp')
    .directive('snackbar', function($rootScope, $compile, $timeout) {

    return function ( scope, element, attrs ) {

        //snackbar container
        var snackbarContainer = angular.element(element);

        //snackbar duration time (ms)
        var snackbarDuration = attrs.snackbarDuration || 3000;

        //delay time to remove from DOM after hide (ms)
        var snackbarRemoveDelay = attrs.snackbarRemoveDelay || 200;


        //receive broadcating
        $rootScope.$on('createSnackbar', function(event, received) {

            //snackbar template
            var template = "<div class=\"snackbar snackbar-opened\"><span class=\"snackbar-content\">" + received.content + "</span></div>";

            //template compile
            var snackbar = angular.element($compile(template)(scope));

            //add snackbar
            snackbarContainer.append(snackbar);

            //snackbar duration time
            $timeout(function () {

                //hide snackbar
                snackbar.removeClass('snackbar-opened');

                //remove snackbar
                $timeout(function () { snackbar.remove(); }, snackbarRemoveDelay, false);

            }, received.duration || snackbarDuration, false);

        });
    };
}).factory('Snackbar', function ($rootScope) {

        return {
            create : function ( content, duration ) {
                $rootScope.$broadcast('createSnackbar', { 'content': content, 'duration': duration });
            }
        };
    });
