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
			html: ['<%= config.path.copyDest %>/**/*.html']
		},

		copy: {
			css: {
				files: [{
					expand: true, 
					src: ['<%= config.path.css %>/**'], 
					dest: '<%= config.path.copyDest %>'
				}]
			},
			img: {
				files: [{
					expand: true,
					src: ['<%= config.path.img %>/**'],
					dest: '<%= config.path.copyDest %>'
				}]
			},
			js: {
				files: [{
					expand: true,
					src: ['<%= config.path.js %>/**'],
					dest: '<%= config.path.copyDest %>'
				}]
			},
			html: {
				files: [{
					expand: true, 
					src: ['*.html'], 
					dest: '<%= config.path.copyDest %>'
				}]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: '<%= config.path.scss %>/**/*.scss',
				tasks: ['sass', 'clean:css', 'copy:css']
			},
			images: {
				files: '<%= config.path.imgSrc %>',
				tasks: ['newer:imagemin', 'clean:img', 'copy:img']
			},
			js: {
				files: '<%= config.path.js %>',
				tasks: ['clean:js', 'copy:js']
			},
			html: {
				files: ['**/*.html', '!<%= config.path.copyDest %>'],
				tasks: ['clean:html', 'copy:html']
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