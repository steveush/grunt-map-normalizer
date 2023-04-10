const path = require( "path" );
const chalk = require( "chalk" );
const {
    anyToAbsolute,
    pruneSources,
    absoluteIsMissing,
    absoluteToRelative,
    absoluteToFileUri,
    absoluteToVirtual,
    isFn,
    modifySources
} = require( "./utils" );

//region type-definitions

/**
 * The options for the "map-normalizer" task".
 * @typedef {object} MapNormalizerOptions
 * @property {string} [output="relative"] - One of the following: "absolute", "relative", "file", "virtual"
 * @property {boolean} [verify=true] - Whether to verify the source files exist.
 * @property {string} [virtualRoot="mapped"] - When `type` is "virtual" this provides the new root path for all sources.
 * @property {modifySources~callback} [callback] - A function to modify each source path.
 */

//endregion

module.exports = function( grunt ) {

    grunt.registerMultiTask( 'map-normalizer', 'The "map-normalizer" task helps normalize and alter generated source maps.', function() {

        const options = /** @type {MapNormalizerOptions} */ this.options( {
            output: 'relative',
            verify: true,
            virtualRoot: null,
            callback: null
        } );

        const results = { success: [], fail: [] };
        this.filesSrc.forEach( ( map_src ) => {

            const result = { file: map_src, options, removed: [], err: null };
            try {
                const map = grunt.file.readJSON( map_src );

                grunt.verbose.write( `Normalizing ${ map_src }` );
                const map_dir = path.dirname( map_src );

                // first convert the sources to absolute paths
                map.sources = anyToAbsolute( map.sources, map_dir );

                grunt.verbose.write( '.' );

                if ( options.verify ) {
                    const missing = absoluteIsMissing( map.sources );
                    pruneSources( map, missing ).forEach( ( src ) => {
                        grunt.verbose.ok( `Removed ${ src }` );
                        result.removed.push( src );
                    } );
                }

                grunt.verbose.write( '.' );

                switch ( options.output ) {
                    case "relative":
                        map.sources = absoluteToRelative( map.sources, map_src );
                        break;
                    case "file":
                        map.sources = absoluteToFileUri( map.sources );
                        break;
                    case "virtual":
                        const virtualRoot = !!options.virtualRoot ? options.virtualRoot : path.basename( map_src, path.extname( map_src ) );
                        map.sources = absoluteToVirtual( map.sources, virtualRoot );
                        break;
                }

                grunt.verbose.write( '.' );

                if ( isFn( options.callback ) ) {
                    const remove = modifySources( map, options.callback );
                    pruneSources( map, remove ).forEach( ( src ) => {
                        grunt.verbose.ok( `Removed ${ src }` );
                        result.removed.push( src );
                    } );
                }

                grunt.verbose.writeln( chalk.green( 'OK' ) );

                grunt.file.write( map_src, JSON.stringify( map ) );
                grunt.verbose.writeln( `File ${ chalk.cyan( map_src ) } normalized (${ options.output }).` );
                results.success.push( result );

            } catch ( err ) {

                result.err = err;
                results.fail.push( result );
                grunt.verbose.error( err.message );

            }

        } );

        grunt.log.ok( `${ results.success.length } ${ grunt.util.pluralize( results.success.length, 'file/files' ) } normalized.` );
        if ( results.fail.length ){
            grunt.log.error( `${ results.fail.length } ${ grunt.util.pluralize( results.fail.length, 'file/files' ) } failed normalization. Run grunt with the --verbose flag for more details.` );
        }

    } );

};