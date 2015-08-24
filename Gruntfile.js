module.exports = function(grunt) {

	var fs = require('fs');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		config: {
			path: {
				ms: 'metalsmith',
				src: '<%=config.path.ms %>/src',
				css: '<%= config.path.src %>/css',
				js: '<%= config.path.src %>/js',
				partials: '<%= config.path.ms %>/partials',
				layouts: '<%= config.path.ms %>/layouts',
				build: 'build',
				scss: 'scss',
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

		metalsmith: {
			dist: {
				options: {
					metadata: {
						pageOne: {
							pageName: 'Main Page',
							url: 'index.html'
						},
						pageTwo: {
							pageName: 'About Us',
							url: 'about.html'
						},
						pageThree: {
							pageName: 'Directions',
							url: 'directions.html'
						}
					},
					plugins: {
						'metalsmith-layouts': {
							engine: 'handlebars',
							pattern: '*.html',
							partials: '<%= config.path.partials %>',
							directory: '<%= config.path.layouts %>',
							default: 'main.html'
						}
					}
				},
				src: '<%= config.path.src %>',
				dest: '<%= config.path.build %>'
			}
		},

		copy: {
			dist: {
				files: [
					{expand: true, cwd: '<%= config.path.build %>', src: '**', dest: '<%= config.path.copyDest %>'}
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
			metalsmith: {
				files: '<%= config.path.ms %>/**/*.*',
				tasks: ['metalsmith', 'copy']
			}
		}

	});

	grunt.registerTask('build', [
		'sass',
		'metalsmith',
		'copy'
	]);

	grunt.registerTask('dev', [
		'build',
		'watch'
	]);

};