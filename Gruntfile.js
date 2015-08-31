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
				imgSrc: 'img-src',
				copyDest: 'tmountjr.github.io',
				destCss: '<%= config.path.copyDest %>/css',
				destJs: '<%= config.path.copyDest %>/js',
				destImg: '<%= config.path.copyDest %>/img',
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

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.path.imgSrc %>/',
					src: ['**/*.png'],
					dest: '<%= config.path.img %>'
				}]
			}
		},

		clean: {
			css: ['<%= config.path.destCss %>'],
			js: ['<%= config.path.destJs %>'],
			img: ['<%= config.path.destImg %>'],
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
				tasks: ['sass', 'clean:css', 'copy']
			},
			images: {
				files: '<%= config.path.imgSrc %>',
				tasks: ['newer:imagemin', 'clean:img']
			},
			dist: {
				files: ['<%= config.path.css %>/**', '<%= config.path.js %>/**', '<%= config.path.img %>/**', '*.html'],
				tasks: ['clean', 'copy']
			}
		}

	});

	grunt.registerTask('build', [
		'sass',
		'imagemin',
		'clean',
		'copy'
	]);

	grunt.registerTask('dev', [
		'build',
		'watch'
	]);

};