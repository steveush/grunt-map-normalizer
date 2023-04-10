const { absoluteToVirtual } = require( "../tasks/utils" );

test( 'absoluteToVirtual( string[], string ) ~ convert all absolute paths to virtual ones using the supplied root', () => {

    const input = [ "C:\\Project\\src\\js\\one.js", "C:\\Project\\src\\js\\two.js", "C:\\Project\\src\\js\\child\\three.js" ];
    const root = "custom";
    const expected = [ "custom/one.js", "custom/two.js", "custom/child/three.js" ];

    expect( absoluteToVirtual( input, root ) ).toEqual( expected );

} );