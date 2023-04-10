/**
 * The callback used to modify or remove sources from the map.
 * @callback modifySources~callback
 * @param {string} src
 * @param {MapLike} [map]
 * @returns {string|false} Returns the modified source or false. If false is returned the source is removed from the map.
 */

/**
 * Modify each of the sources using the supplied callback.
 * @param {MapLike} map
 * @param {modifySources~callback} callback
 * @returns {number[]} Returns an array of indexes to remove.
 */
const modifySources = ( map, callback ) => {
    return map.sources.reduce( ( remove, src, i ) => {
        const result = callback( src, map );
        if ( result !== false ) map.sources[ i ] = result;
        else remove.push( i );
        return remove;
    }, [] );
};

module.exports = modifySources;