/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
		jsVendors: {
			src: require('../pipeline').jsVendorsFilesToInject,
			dest: '.tmp/public/concat/production-vendors.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject,
			dest: '.tmp/public/concat/production.css'
		},
		cssVendors: {
			src: require('../pipeline').csVendorssFilesToInject,
			dest: '.tmp/public/concat/production-vendors.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
