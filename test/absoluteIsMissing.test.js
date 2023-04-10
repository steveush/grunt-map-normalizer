const { absoluteIsMissing } = require( "../tasks/utils" );
const fs = require( "fs" );

jest.mock( "fs" );

test( 'absoluteIsMissing( string[] ) ~ should resolve missing files and return an array of the indexes', () => {

    // sets up the mocked return values: true, false, true
    fs.existsSync.mockReturnValueOnce( true ).mockReturnValueOnce( false ).mockReturnValue( true );

    const input = [ "one", "two", "three" ];

    expect( absoluteIsMissing( input ) ).toEqual( [ 1 ] );

    expect( fs.existsSync ).toHaveBeenNthCalledWith( 1, "one" );
    expect( fs.existsSync ).toHaveBeenNthCalledWith( 2, "two" );
    expect( fs.existsSync ).toHaveBeenNthCalledWith( 3, "three" );

} );