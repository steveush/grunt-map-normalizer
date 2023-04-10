const { existsSync } = require( "fs" );
/**
 * Checks all paths to see if they exist, returns the indexes of those that are missing.
 * @param {string[]} absPaths - The array of absolute paths to check.
 * @returns {number[]} Returns an array of missing paths indexes.
 */
const absoluteIsMissing = ( absPaths ) => {
    return absPaths.reduce( ( missing, absPath, i ) => {
        if ( !existsSync( absPath ) ) missing.push( i );
        return missing;
    }, [] );
};

module.exports = absoluteIsMissing;