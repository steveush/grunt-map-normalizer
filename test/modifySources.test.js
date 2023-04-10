const { modifySources } = require( "../tasks/utils" );

test( 'modifySources( object, function ) ~ modify each source using the given callback', () => {

    const mapLike = {
        sources: [ "one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const expected = {
        remove: [ 1 ],
        sources: [ "modified$one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const remove = modifySources( mapLike, ( src, map ) => {
        if ( src === "one" ) return "modified$one"; // modify the value
        if ( src === "two" ) return false; // exclude the source entirely
        return src; // otherwise do nothing and return the original value
    } );

    expect( remove ).toEqual( expected.remove );
    expect( mapLike.sources ).toEqual( expected.sources );
    expect( mapLike.sourcesContent ).toEqual( expected.sourcesContent );

} );