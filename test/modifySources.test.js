const { modifySources } = require( "../tasks/utils" );

test( 'modifySources( object, function ) ~ modify each source using the given callback', () => {

    const mapLike = {
        sources: [ "one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const expected = {
        changed: [{ from: "one", to: "modified$one" }],
        filtered: [ 1 ],
        sources: [ "modified$one", "two", "three" ],
        sourcesContent: [ "one", "two", "three" ]
    };

    const result = modifySources( mapLike, ( src, map ) => {
        if ( src === "one" ) return "modified$one"; // modify the value
        if ( src === "two" ) return false; // exclude the source entirely
        return src; // otherwise do nothing and return the original value
    } );

    expect( result.changed ).toEqual( expected.changed );
    expect( result.filtered ).toEqual( expected.filtered );
    expect( mapLike.sources ).toEqual( expected.sources );
    expect( mapLike.sourcesContent ).toEqual( expected.sourcesContent );

} );