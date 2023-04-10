/**
 * Remove both the sources and any corresponding sourcesContent using the supplied indexes.
 * @param {MapLike} map
 * @param {number[]} indexes
 * @returns {string[]} Returns any source paths that were removed.
 */
const pruneSources = ( map, indexes ) => {
    const hasContent = map.hasOwnProperty( 'sourcesContent' ) && Array.isArray( map.sourcesContent );
    // sort the indexes to remove so that we always start with the largest
    return indexes.sort( ( a, b ) => b - a ).reduce( ( removed, index ) => {
        if ( map.sources.length > index ) removed.push( ...map.sources.splice( index, 1 ) );
        if ( hasContent && map.sourcesContent.length > index ) map.sourcesContent.splice( index, 1 );
        return removed;
    }, [] );
};

module.exports = pruneSources;