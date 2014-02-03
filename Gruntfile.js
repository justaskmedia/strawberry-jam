module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'assets/dev/js/libs/*.js', // All JS in the libs folder
                    'assets/dev/js/plugins.js', // All JS in the libs folder
                    'assets/dev/js/main.js'  // This specific file
                ],
                dest: 'assets/prod/js/production.js',
            }
        },
        uglify: {
            build: {
                src: 'assets/prod/js/production.js',
                dest: 'assets/prod/js/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/dev/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/prod/img/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: true,
                },
                files: {
                    'assets/prod/css/global.css': 'assets/dev/sass/global.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'assets/prod/css/global.css': 'assets/prod/css/global.css'
                }
            }
        },
        watch: {
            css: {
                files: ['assets/dev/sass/*.scss', 'assets/dev/sass/*/**.scss'],
                tasks: ['gen-css'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
    grunt.registerTask('gen-css', ['sass', 'autoprefixer' ]);

};
