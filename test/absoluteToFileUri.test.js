const { absoluteToFileUri } = require( "../tasks/utils" );

test( 'absoluteToFileUri( string[] ) ~ convert all absolute paths to file URLs', () => {

    const input = [ "C:\\Project\\src\\js\\one.js", "C:\\Project\\src\\js\\two.js", "C:\\Project\\src\\js\\child\\three.js" ];
    const expected = [ "file:///C:/Project/src/js/one.js", "file:///C:/Project/src/js/two.js", "file:///C:/Project/src/js/child/three.js" ];

    expect( absoluteToFileUri( input ) ).toEqual( expected );

} );