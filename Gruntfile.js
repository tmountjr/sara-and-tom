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
				spriteSrc: 'sprite-src',
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

		sprite: {
			dist: {
				src: '<%= config.path.spriteSrc %>/*.png',
				dest: '<%= config.path.img %>/sprites.png',
				destCss: '<%= config.path.scss %>/layout/_sprites.scss'
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.path.imgSrc %>/',
					src: ['**/*.{png,jpg,gif}'],
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

		swig: {
			compiled: {
				dest: 'compiled-index',
				src: ['swig-templates/*.swig'],
				generateSitemap: false,
				generateRobotstxt: false
			}
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
			spite: {
				files: '<%= config.path.spriteSrc %>/*.*',
				tasks: ['sprite', 'clean:css', 'clean:img', 'copy:css', 'copy:img']
			},
			images: {
				files: '<%= config.path.imgSrc %>',
				tasks: ['newer:imagemin', 'clean:img', 'copy:img']
			},
			js: {
				files: '<%= config.path.js %>/**/*.js',
				tasks: ['clean:js', 'copy:js']
			},
			html: {
				files: ['index.html'],
				tasks: ['clean:html', 'copy:html']
			}
		}

	});

	grunt.registerTask('build', [
		'sprite',
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