const { sep } = require( "path" );
const commonOfAbsolute = require( "./commonOfAbsolute" );

/**
 * Convert all paths to virtual paths replacing the closest common directory with the supplied "root" parameter.
 * @param {string[]} absPaths - The array of absolute paths to convert to virtual paths.
 * @param {string} root - The virtual path to use.
 * @returns {string[]}
 */
const absoluteToVirtual = ( absPaths, root ) => {
    const common = commonOfAbsolute( absPaths );
    return absPaths.map( absPath => absPath.replace( common, root ).replaceAll( sep, '/' ) );
};

module.exports = absoluteToVirtual;