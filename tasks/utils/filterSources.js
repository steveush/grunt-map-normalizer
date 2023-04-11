/**
 * The callback used to filter map sources.
 * @callback filterSources~callback
 * @param {string} src
 * @param {MapLike} [map]
 * @returns {boolean} Return true to include the source in the resulting array.
 */

/**
 * Filter the sources using the supplied callback. Only sources that pass the test implemented by the callback will be kept.
 * @param {MapLike} map
 * @param {filterSources~callback} callback
 * @returns {number[]} Returns an array of source indexes to remove.
 */
const filterSources = ( map, callback ) => {
    return map.sources.reduce( ( remove, src, i ) => {
        if ( !callback( src, map ) ) remove.push( i );
        return remove;
    }, [] );
};

module.exports = filterSources;