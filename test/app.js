'use strict';

angular.module('testApp', ['biblioGopApp'])
  .constant('testAppConfig', {
    basePath: 'app'
  })
  .run(function($templateCache, testAppConfig) {

    function path(templateUrl) {
      return templateUrl.replace(testAppConfig.basePath + '/', '');
    }

    /*
     * Put the templates collected by karma in the template cache.
     *
     * Unless templates are available in the template cache, an asynchronous
     * request is made, triggering an error from $httpBackend.
     *
     * Templates are collected by karma and put in window.__html__
     */
    Object.keys(window.__html__).forEach(function(key) {
      $templateCache.put(path(key), window.__html__[key]);
    });
  })
;
