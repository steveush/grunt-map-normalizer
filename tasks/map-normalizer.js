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
    modifySources,
    filterSources
} = require( "./utils" );

//region type-definitions

/**
 * The options for the "map-normalizer" task".
 * @typedef {object} MapNormalizerOptions
 * @property {string} [output="relative"] - One of the following: "absolute", "relative", "file", "virtual"
 * @property {boolean} [verify=true] - Whether to verify the source files exist.
 * @property {string} [virtualRoot="mapped"] - When `type` is "virtual" this provides the new root path for all sources.
 * @property {filterSources~callback} [filter] - A function to filter the sources.
 * @property {modifySources~callback} [modify] - A function to modify the sources.
 */

//endregion

module.exports = function( grunt ) {

    grunt.registerMultiTask( 'map-normalizer', 'The "map-normalizer" task helps normalize and alter generated source maps.', function() {

        const options = /** @type {MapNormalizerOptions} */ this.options( {
            output: 'relative',
            verify: true,
            virtualRoot: null,
            filter: null,
            modify: null
        } );

        const results = { success: [], fail: [] };
        this.filesSrc.forEach( ( filepath ) => {

            const map_src = path.resolve( filepath );
            const map_dir = path.dirname( map_src );
            const result = { file: map_src, options, removed: [], err: null };
            try {

                grunt.verbose.ok( `Normalizing ${ chalk.cyan( map_src ) }` );

                const map = grunt.file.readJSON( map_src );

                // first convert the sources to absolute paths
                map.sources = anyToAbsolute( map.sources, map_dir );

                if ( options.verify ) {
                    const missing = absoluteIsMissing( map.sources );
                    pruneSources( map, missing ).forEach( ( src ) => {
                        grunt.verbose.writeln( `Missing source ${ chalk.red( src ) }` );
                        result.removed.push( src );
                    } );
                }

                if ( isFn( options.filter ) ){
                    const filtered = filterSources( map, options.filter );
                    pruneSources( map, filtered ).forEach( ( src ) => {
                        grunt.verbose.writeln( `Removed source ${ chalk.yellow( src ) }` );
                        result.removed.push( src );
                    } );
                }

                switch ( options.output ) {
                    case "relative":
                        map.sources = absoluteToRelative( map.sources, map_dir );
                        break;
                    case "file":
                        map.sources = absoluteToFileUri( map.sources );
                        break;
                    case "virtual":
                        const virtualRoot = !!options.virtualRoot ? options.virtualRoot : path.basename( map_src, path.extname( map_src ) );
                        map.sources = absoluteToVirtual( map.sources, virtualRoot );
                        break;
                }

                if ( isFn( options.modify ) ) {
                    const { changed, filtered } = modifySources( map, options.modify );
                    changed.forEach( ( change ) => {
                        grunt.verbose.writeln( `Changed source ${ chalk.yellow( change.from ) } to ${ chalk.yellow( change.to ) }` );
                    } );
                    pruneSources( map, filtered ).forEach( ( src ) => {
                        grunt.verbose.writeln( `Removed source ${ chalk.yellow( src ) }` );
                        result.removed.push( src );
                    } );
                }

                grunt.file.write( map_src, JSON.stringify( map ) );
                grunt.verbose.writeln( `File ${ chalk.cyan( map_src ) } normalized (${ chalk.cyan( options.output ) }).` );
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