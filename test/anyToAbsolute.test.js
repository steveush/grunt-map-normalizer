const { anyToAbsolute } = require( "../tasks/utils" );

test( 'anyToAbsolute( string[] [, string] ) ~ convert any source paths to absolute paths', () => {

    const expected = [ "C:\\Project\\src\\js\\one.js", "C:\\Project\\src\\js\\two.js", "C:\\Project\\src\\js\\child\\three.js" ];

    expect( anyToAbsolute( expected ) ).toEqual( expected );

    const input_1 = [ "file:///C:/Project/src/js/one.js", "file:///C:/Project/src/js/two.js", "file:///C:/Project/src/js/child/three.js" ];
    expect( anyToAbsolute( input_1 ) ).toEqual( expected );

    const input_2 = [ "../src/js/one.js", "../src/js/two.js", "../src/js/child/three.js" ];
    const from_2 = "C:\\Project\\assets";
    expect( anyToAbsolute( input_2, from_2 ) ).toEqual( expected );

} );