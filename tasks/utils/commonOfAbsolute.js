const segmentIfEqual = require( "./segmentIfEqual" );
const { sep } = require( "path" );

/**
 * Returns the closest common path for the supplied absolute paths.
 * @param {string[]} absPaths - An array of absolute paths to find the common path of.
 * @param {string} [separator]
 * @returns {string}
 */
const commonOfAbsolute = ( absPaths, separator = sep ) => {
    if ( !Array.isArray( absPaths ) ) return '';

    const exploded = absPaths.map( p => p.split( separator ) ).sort( ( a, b ) => a.length - b.length );
    if ( !Array.isArray( exploded.at( 0 ) ) ) return '';

    const result = [];
    const len = exploded.at( 0 ).length;
    for ( let i = 0; i < len; i++ ){
        const segment = segmentIfEqual( exploded, i );
        if ( segment !== false ) result.push( segment );
        else break;
    }
    return result.join( separator );
};

module.exports = commonOfAbsolute;