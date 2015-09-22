/**
 * Created by alex on 21/09/15.
 */
/**
 * Copy usefull bower dependency from bower_components folder to js/vendors && styles/vendors
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function(grunt) {

    grunt.config.set('bowercopy', {
        jsLibs: {
            options: {
                runBower : false,
                destPrefix: '.tmp/public/js/vendors'
            },
            files: {
                '2.cloudinary.js' : 'cloudinary_js/js/jquery.cloudinary.js',
                '5.angular-translate.js' : 'angular-translate/angular-translate.js',
                '6.angular-translate-files.js' : 'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                '7.angular-animate.js' : 'angular-animate/angular-animate.js',
                '8.angular-coockie.js' : 'angular-cookies/angular-cookies.js',
                '9.angular-resource.js' : 'angular-resource/angular-resource.js',
                '10.angular-route.js' : 'angular-route/angular-route.js',
                '11.angular-sanitize.js' : 'angular-sanitize/angular-sanitize.js',
                '12.angular-touch.js' : 'angular-touch/angular-touch.js',
                '13.angular-ui-router.js' : 'angular-ui-router/release/angular-ui-router.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
};
