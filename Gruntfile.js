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
				domainDest: 'domain',
				subdomainDest: 'subdomain',
				swigTemplates: 'swig-templates',
				swigDest: 'compiled-index',
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
			swigDest: ['<%= config.path.swigDest %>/*.html'],

			domainCss: ['<%= config.path.domainDest %>/css/**'],
			domainJs: ['<%= config.path.domainDest %>/js/**'],
			domainImg: ['<%= config.path.domainDest %>/img/**'],
			domainIndex: ['<%= config.path.domainDest %>/index.html'],

			subdomainCss: ['<%= config.path.subdomainDest %>/css/**'],
			subdomainJs: ['<%= config.path.subdomainDest %>/js/**'],
			subdomainImg: ['<%= config.path.subdomainDest %>/img/**'],
			subdomainIndex: ['<%= config.path.subdomainDest %>/index.html'],
		},

		swig: {
			compiled: {
				dest: '<%= config.path.swigDest %>',
				src: ['<%= config.path.swigTemplates %>/*.swig'],
				generateSitemap: false,
				generateRobotstxt: false
			}
		},

		copy: {
			// copy domain css
			domainCss: {
				files: [{
					expand: true,
					src: '<%= config.path.css %>/**',
					dest: '<%= config.path.domainDest %>'
				}]
			},

			// copy domain img
			domainImg: {
				files: [{
					expand: true,
					src: '<%= config.path.img %>/**',
					dest: '<%= config.path.domainDest %>'
				}]
			},

			// copy domain js
			domainJs: {
				files: [{
					expand: true,
					src: '<%= config.path.js %>/**/*',
					dest: '<%= config.path.domainDest %>'
				}]
			},

			// copy and rename the domain index file
			domainIndex: {
				files: [{
					expand: true,
					cwd: '<%= config.path.swigDest %>/',
					src: 'domain.html',
					dest: '<%= config.path.domainDest %>/',
					rename: function(dest, src) {
						return dest + src.replace('domain.html', 'index.html');
					}
				}]
			},

			// copy subdomain css
			subdomainCss: {
				files: [{
					expand: true,
					src: '<%= config.path.css %>/**',
					dest: '<%= config.path.subdomainDest %>'
				}]
			},

			// copy subdomain img
			subdomainImg: {
				files: [{
					expand: true,
					src: '<%= config.path.img %>/**',
					dest: '<%= config.path.subdomainDest %>'
				}]
			},

			// copy subdomain js
			subdomainJs: {
				files: [{
					expand: true,
					src: '<%= config.path.js %>/**/*',
					dest: '<%= config.path.subdomainDest %>'
				}]
			},

			// copy and rename the subdomain index file
			subdomainIndex: {
				files: [{
					expand: true,
					cwd: '<%= config.path.swigDest %>/',
					src: 'subdomain.html',
					dest: '<%= config.path.subdomainDest %>/',
					rename: function(dest, src) {
						return dest + src.replace('subdomain.html', 'index.html');
					}
				}]
			},
		},

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: '<%= config.path.scss %>/**/*.scss',
				tasks: ['sass', 'clean:domainCss', 'clean:subdomainCss', 'copy:domainCss', 'copy:subdomainCss']
			},
			sprites: {
				files: '<%= config.path.spriteSrc %>/*.*',
				tasks: ['sprite', 'clean:domainCss', 'clean:subdomainCss', 'clean:domainImg', 'clean:subdomainImg', 'copy:domainCss', 'copy:subdomainCss', 'copy:domainImg', 'copy:subdomainImg']
			},
			images: {
				files: '<%= config.path.imgSrc %>/**',
				tasks: ['newer:imagemin', 'clean:domainImg', 'clean:subdomainImg', 'copy:domainImg', 'copy:subdomainImg']
			},
			js: {
				files: '<%= config.path.js %>/**/*.js',
				tasks: ['clean:domainJs', 'clean:subdomainJs', 'copy:domainJs', 'copy:subdomainJs']
			},
			swig: {
				files: '<%= config.path.swigTemplates %>/**/*',
				tasks: ['clean:swigDest', 'clean:domainIndex', 'clean:subdomainIndex', 'swig', 'copy:domainIndex', 'copy:subdomainIndex']
			}
		}

	});

	// internal copy tasks
	grunt.registerTask('fullDomain', [
		'domainCss',
		'domainImg',
		'domainJs',
		'domainIndex',
	]);

	grunt.registerTask('fullSubdomain', [
		'subdomainCss',
		'subdomainImg',
		'subdomainJs',
		'subdomainIndex',
	]);

	grunt.registerTask('build', [
		'sprite',
		'sass',
		'imagemin',
		'clean',
		'swig',
		'copy'
	]);

	grunt.registerTask('dev', [
		'build',
		'watch'
	]);

};