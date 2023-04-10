const { relative, sep } = require( "path" );

/**
 * Convert all paths to relative paths based on the "from" parameter.
 * @param {string[]} absPaths - The array of absolute paths to convert to relative paths.
 * @param {string} [from] - The directory from which to make paths relative.
 * @returns {string[]}
 * @see {@link https://nodejs.org/api/path.html#pathresolvepaths|path.relative} for more documentation on the "from" parameter.
 */
const absoluteToRelative = ( absPaths, from ) => absPaths.map( absPath => relative( from, absPath ).replaceAll( sep, '/' ) );

module.exports = absoluteToRelative;