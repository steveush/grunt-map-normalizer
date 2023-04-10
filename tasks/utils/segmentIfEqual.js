/**
 * Return a segment if the value is equal across all exploded paths, otherwise false is returned.
 * @param {string[][]} exploded - An array of exploded paths.
 * @param {number} index - The index of the segment to test.
 * @returns {string|false}
 */
const segmentIfEqual = ( exploded, index ) => {
    let testValue;
    if ( Array.isArray( exploded.at( 0 ) ) ) {
        testValue = exploded.at( 0 ).at( index );
        if ( !!testValue ){
            const segments = exploded.map( segments => segments.at( index ) );
            if ( segments.every( segment => segment === testValue ) ) {
                return testValue;
            }
        }
    }
    return false;
};

module.exports = segmentIfEqual;