const { pathToFileURL } = require( "url" );

/**
 * Convert all paths to file URLs.
 * @param {string[]} absPaths - The array of absolute paths to convert to file URLs.
 * @returns {string[]}
 */
const absoluteToFileUri = ( absPaths ) => absPaths.map( absPath => String( pathToFileURL( absPath ) ) );

module.exports = absoluteToFileUri;