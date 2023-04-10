const { segmentIfEqual } = require( "../tasks/utils" );

test( 'segmentIfEqual( string[][], number ) ~ ', () => {

    const exploded = [ ["C:","Project","src","js","one.js"], ["C:","Project","src","js","two.js"], ["C:","Project","src","js","child","three.js"] ];

    expect( segmentIfEqual( exploded, 0 ) ).toBe( "C:" );
    expect( segmentIfEqual( exploded, 1 ) ).toBe( "Project" );
    expect( segmentIfEqual( exploded, 2 ) ).toBe( "src" );
    expect( segmentIfEqual( exploded, 3 ) ).toBe( "js" );
    expect( segmentIfEqual( exploded, 4 ) ).toBe( false );

} );