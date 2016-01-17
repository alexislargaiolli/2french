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
                '1_jquery.js': 'jquery/dist/jquery.js',
                '2_angular.js': 'angular/angular.js',
                '3_angular-translate.js': 'angular-translate/angular-translate.js',
                '4_angular-translate-files.js': 'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                '5_angular-animate.js': 'angular-animate/angular-animate.js',
                '6_angular-coockie.js': 'angular-cookies/angular-cookies.js',
                '7_angular-resource.js': 'angular-resource/angular-resource.js',
                '8_angular-route.js': 'angular-route/angular-route.js',
                '9_angular-sanitize.js': 'angular-sanitize/angular-sanitize.js',
                '10_angular-touch.js': 'angular-touch/angular-touch.js',
                '11_angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',

                '12_boostrap.js': 'bootstrap/dist/js/bootstrap.js',
                '13_bootstarp-tour.js': 'bootstrap-tour/build/js/bootstrap-tour.js',
                '14_jquery-cloudinary.js': 'cloudinary_js/js/jquery.cloudinary.js',
                '15_xeditable.js': 'angular-xeditable/dist/js/xeditable.js',
                '16_dynamic-locale.js': 'angular-dynamic-locale/dist/tmhDynamicLocale.js',
                '17_lodash.js': 'lodash/lodash.js',
                '18_angular-google-maps.js': 'angular-google-maps/dist/angular-google-maps.js',
                '19_autocomplete.js': 'angular-google-places-autocomplete/src/autocomplete.js',
                '20_select.js': 'angular-ui-select/dist/select.js',
                '21_bootstarp-template.js': 'angular-bootstrap/ui-bootstrap-tpls.js',
                '22_ng-img-drop.js': 'ng-img-crop/compile/unminified/ng-img-crop.js',
                '23_angular-file-upload-shim.js': 'ng-file-upload/angular-file-upload-shim.js',
                '24_angular-cloudinary.js': 'cloudinary_ng/js/angular.cloudinary.js',
                '25_angular-file-upload.js': 'ng-file-upload/angular-file-upload.js',
                '26_moment.js': 'moment/moment.js',
                '27_fr.js': 'moment/locale/fr.js',
                '28_uk.js': 'moment/locale/uk.js',
                '29_es.js': 'moment/locale/es.js',
                '30_v-accordion.js': 'v-accordion/dist/v-accordion.js',
                '31_anim-in-out.js': 'angular-ui-router-anim-in-out/anim-in-out.js',
                '32_angular-bootstarp-lightbox.js': 'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
                '33_angular-carousel.js': 'angular-carousel/dist/angular-carousel.js',
                '34_roundProgress.js': 'angular-svg-round-progressbar/build/roundProgress.js'
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
