const { fileURLToPath } = require( "url" );
const { isAbsolute, resolve } = require( "path" );

/**
 * Convert all sources to absolute file paths.
 * @param {string[]} sources - The array of source paths to convert to absolute paths.
 * @param {string} [from] - The directory from which to resolve relative paths.
 * @returns {string[]}
 */
const anyToAbsolute = ( sources, from ) => sources.map( src => src.startsWith( 'file:' ) ? fileURLToPath( src ) : isAbsolute( src ) ? src : resolve( from, src ) );

module.exports = anyToAbsolute;