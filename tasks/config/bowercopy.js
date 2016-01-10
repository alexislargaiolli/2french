/**
 * Created by alex on 21/09/15.
 */
/**
 * Copy usefull bower dependency from bower_components folder to js/vendors && styles/vendors
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function (grunt) {

    grunt.config.set('bowercopy', {
        jsLibs: {
            options: {
                runBower: false,
                destPrefix: '.tmp/public/vendors/js'
            },
            files: {
                '01.js': 'jquery/dist/jquery.js',
                '02.js': 'angular/angular.js',
                '1.angular-translate.js': 'angular-translate/angular-translate.js',
                '2.angular-translate-files.js': 'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                '3.angular-animate.js': 'angular-animate/angular-animate.js',
                '4.angular-coockie.js': 'angular-cookies/angular-cookies.js',
                '5.angular-resource.js': 'angular-resource/angular-resource.js',
                '6.angular-route.js': 'angular-route/angular-route.js',
                '7.angular-sanitize.js': 'angular-sanitize/angular-sanitize.js',
                '8.angular-touch.js': 'angular-touch/angular-touch.js',
                '9.angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',
                '10.js': 'bootstrap/dist/js/bootstrap.js',
                '11.js': 'bootstrap-tour/build/js/bootstrap-tour.js',
                '12.cloudinary.js': 'cloudinary_js/js/jquery.cloudinary.js',
                '14.js': 'angular-xeditable/dist/js/xeditable.js',
                '15.js': 'lodash/lodash.js',
                '16.js': 'angular-google-maps/dist/angular-google-maps.js',
                '17.js': 'angular-google-places-autocomplete/src/autocomplete.js',
                '18.js': 'angular-ui-select/dist/select.js',
                '19.js': 'angular-bootstrap/ui-bootstrap-tpls.js',
                '21.js': 'ng-img-crop/compile/unminified/ng-img-crop.js',
                '22.js': 'ng-file-upload/angular-file-upload-shim.js',
                '23.js': 'cloudinary_ng/js/angular.cloudinary.js',
                '24.js': 'ng-file-upload/angular-file-upload.js',
                '25.js': 'moment/moment.js',
                '26.js': 'moment/locale/fr.js',
                '26.1.js': 'moment/locale/uk.js',
                '26.2.js': 'moment/locale/es.js',
                '27.js': 'v-accordion/dist/v-accordion.js',
                '28.js': 'angular-ui-router-anim-in-out/anim-in-out.js',
                '29.js': 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
                '30.js': 'angular-carousel/dist/angular-carousel.js',
                '32.js': 'angular-dynamic-locale/dist/tmhDynamicLocale.js',
                '33.js': 'angular-svg-round-progressbar/build/roundProgress.js'
            }
        },
        cssLibs: {
            options: {
                runBower: false,
                destPrefix: '.tmp/public/vendors/css'
            },
            files: {
                '3.css': 'angular-xeditable/dist/css/xeditable.css',
                '4.css': 'angular-ui-select/dist/select.css',
                '6.css': 'angular-google-places-autocomplete/src/autocomplete.css',
                '7.css': 'ng-img-crop/compile/unminified/ng-img-crop.css',
                '8.css': '../libs/multiple-date-picker/dist/multiple-date-picker.css',
                '9.css': 'v-accordion/dist/v-accordion.css',
                '10.css': 'angular-ui-router-anim-in-out/css/anim-in-out.css',
                '11.css': 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
                '12.css': 'angular-carousel/dist/angular-carousel.css',
                '13.css': 'bootstrap-tour/build/css/bootstrap-tour.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
};
