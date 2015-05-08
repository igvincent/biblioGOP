module.exports = function (grunt) {
  'use strict';

  var target = grunt.option('target') || 'dev';
  var environment = grunt.file.readJSON('environment.json')[target];

  /* Loading all the grunt-* task.   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /* Watch task.
     * Will launch the 'compass' task whenever a .scss file is modified in the sass/ folder.
     * */
    watch: {
      css: {
        files: ['app/styles/*.scss'],
        tasks: ['compass']
      },
      javascript: {
        files: ["app/**/*.js", "app/**/*.html"]
      },
      options: {
        livereload: true
      }
    },
    /* Task which convert the scss in css.  */
    compass: {
      options: {
        sassDir: 'app/styles/',
        cssDir: 'app/assets/styles/'
      },
      dist: {}
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    /* emulate a tiny server in localhost:9000 in order to brower /src/ source folder. */
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app/'
        }
      }
    }
  });

  grunt.registerTask('default', ['compass']);
  grunt.registerTask('reloading', ['watch']);
  grunt.registerTask('server', ['connect', 'watch']);
};
