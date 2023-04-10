const { pruneSources: pruneSourcesTest } = require( "../tasks/utils" );

test( 'pruneSources( object, number[] ) ~ prune the supplied sources and there corresponding sourcesContent from the map', () => {

    const mapLike = {
        sources: [ "one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const expected = {
        removed: [ "two" ],
        sources: [ "one", "three" ],
        sourcesContent: [ "one", "three" ]
    };

    const removed = pruneSourcesTest( mapLike, [ 1 ] );

    expect( removed ).toEqual( expected.removed );
    expect( mapLike.sources ).toEqual( expected.sources );
    expect( mapLike.sourcesContent ).toEqual( expected.sourcesContent );

} );