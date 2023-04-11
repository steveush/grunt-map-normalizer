module.exports = function( grunt ){

    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadTasks( './tasks' );

    grunt.initConfig( {
        "concat": {
            test: {
                options: {
                    sourceMap: true,
                    sourceMapStyle: 'embed'
                },
                src: [ './test/src/**/*.js' ],
                dest: './test/assets/combined.js'
            }
        },
        "uglify": {
            test: {
                options: {
                    sourceMap: { includeSources: true },
                    sourceMapIn: './test/assets/combined.js.map'
                },
                src: [ './test/assets/combined.js' ],
                dest: './test/assets/uglified.js'
            }
        },
        "map-normalizer": {
            test: {
                options: {
                    output: 'file'
                },
                src: [ './test/assets/*.map' ]
            },
            test2: {
                options: {
                    output: 'relative'
                },
                src: [ './test/assets/uglified.js.map' ]
            },
            test3: {
                options: {
                    output: 'absolute',
                    filter: ( src ) => !src.endsWith( "three.js" )
                },
                src: [ './test/assets/uglified.js.map' ]
            },
            test4: {
                options: {
                    output: 'virtual',
                    virtualRoot: 'custom',
                    modify: ( src ) => {
                        if ( src.endsWith( "three.js" ) ) return false;
                        return src.replace( "custom", "project" );
                    }
                },
                src: [ './test/assets/combined.js.map' ]
            }
        }
    } );

    grunt.registerTask( 'default', ['concat','uglify','map-normalizer'] );

};