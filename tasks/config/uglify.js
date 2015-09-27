/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 *        https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function (grunt) {

    grunt.config.set('uglify', {
        options: {
            mangle: false
        },
        dist: {
            src: ['.tmp/public/concat/production.js'],
            dest: '.tmp/public/min/production.min-' + require('../pipeline').version + '.js'
        },
        vendors: {
            src: ['.tmp/public/concat/production-vendors.js'],
            dest: '.tmp/public/min/production-vendors.min.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
