const { absoluteToRelative } = require( "../tasks/utils" );

test( 'absoluteToRelative( string[], string ) ~ convert all absolute paths to relative paths.', () => {

    const input = [ "C:\\Project\\src\\js\\one.js", "C:\\Project\\src\\js\\two.js", "C:\\Project\\src\\js\\child\\three.js" ];
    const from = "C:\\Project\\assets";
    const expected = [ "../src/js/one.js", "../src/js/two.js", "../src/js/child/three.js" ];

    expect( absoluteToRelative( input, from ) ).toEqual( expected );

} );