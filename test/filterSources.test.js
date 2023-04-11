const { filterSources } = require( "../tasks/utils" );

test( 'filterSources( object, function ) ~ filter the sources using the given callback', () => {

    const mapLike = {
        sources: [ "one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const expected = {
        filtered: [ 1 ],
        sources: [ "one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const filtered = filterSources( mapLike, ( src, map ) => src !== "two" );

    expect( filtered ).toEqual( expected.filtered );
    expect( mapLike.sources ).toEqual( expected.sources );
    expect( mapLike.sourcesContent ).toEqual( expected.sourcesContent );

} );