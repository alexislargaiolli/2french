module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev',
		'bowercopy:jsLibs',
		'bowercopy:cssLibs'
	]);
};
