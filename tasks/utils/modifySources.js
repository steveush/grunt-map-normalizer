/**
 * The callback used to modify or remove sources from the map.
 * @callback modifySources~callback
 * @param {string} src
 * @param {MapLike} [map]
 * @returns {string|false} Returns the modified source or false. If false is returned the source is removed from the map.
 */

/**
 * An object storing the from and to values for a source change.
 * @typedef {object} modifySources~Change
 * @property {string} from - The original value of the source.
 * @property {string} to - The updated value for the source.
 */

/**
 * An object containing the result of a call to the modifySources() method.
 * @typedef {object} modifySources~Result
 * @property {modifySources~Change[]} changed - An array of changes made to the sources.
 * @property {number[]} filtered - An array of filtered indexes.
 */

/**
 * Modify each of the sources using the supplied callback.
 * @param {MapLike} map - The map object to modify.
 * @param {modifySources~callback} callback - The callback used to modify the sources.
 * @returns {modifySources~Result}
 */
const modifySources = ( map, callback ) => {
    const changed = [];
    const filtered = map.sources.reduce( ( remove, src, i ) => {
        const result = callback( src, map );
        if ( result !== false ){
            if ( map.sources[ i ] !== result ){
                changed.push( { from: map.sources[ i ], to: result } );
                map.sources[ i ] = result;
            }
        }
        else remove.push( i );
        return remove;
    }, [] );
    return { changed, filtered };
};

module.exports = modifySources;