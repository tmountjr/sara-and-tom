module.exports = function(grunt) {

	var fs = require('fs');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		config: {
			path: {
				css: 'css',
				js: 'js',
				scss: 'scss',
				img: 'img',
				copyDest: 'tmountjr.github.io'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
				},
				files: {
					'<%= config.path.css %>/main.css': '<%= config.path.scss %>/main.scss'
				}
			}
		},

		copy: {
			dist: {
				files: [
					{expand: true, src: ['<%= config.path.css %>/**', '<%= config.path.js %>/**', '<%= config.path.img %>/**', '*.html'], dest: '<%= config.path.copyDest %>'}
				],
			}
		},

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: '<%= config.path.scss %>/**/*.scss',
				tasks: 'sass'
			},
			dist: {
				files: ['<%= config.path.css %>/**', '<%= config.path.js %>/**', '<%= config.path.img %>/**', '*.html'],
				tasks: 'copy'
			}
		}

	});

	grunt.registerTask('build', [
		'sass',
		'copy'
	]);

	grunt.registerTask('dev', [
		'build',
		'watch'
	]);

};