const { commonOfAbsolute } = require( "../tasks/utils" );

test( 'commonOfAbsolute( string[] ) ~ tests an array of paths to find the closest common path', () => {

    const absoluteJS = [ "C:\\Project\\src\\js\\one.js", "C:\\Project\\src\\js\\two.js", "C:\\Project\\src\\js\\child\\three.js" ];
    const absoluteCSS = [ "C:\\Project\\src\\css\\one.css", "C:\\Project\\src\\css\\two.css", "C:\\Project\\src\\css\\child\\three.css" ];

    expect( commonOfAbsolute( absoluteJS ) ).toBe( "C:\\Project\\src\\js" );
    expect( commonOfAbsolute( absoluteCSS ) ).toBe( "C:\\Project\\src\\css" );
    expect( commonOfAbsolute( [ ...absoluteJS, ...absoluteCSS ] ) ).toBe( "C:\\Project\\src" );

    const justDrive = [ "C:\\Project\\src\\js\\one.js", "C:\\SomeProject\\src\\js\\one.js" ];

    expect( commonOfAbsolute( justDrive ) ).toBe( "C:" );

    const noCommon = [ "C:\\Project\\src\\js\\one.js", "D:\\SomeProject\\src\\js\\one.js" ];

    expect( commonOfAbsolute( noCommon ) ).toBe( "" );

} );