const { isFn } = require( "../tasks/utils" );

test( 'isFn( any ) ~ check if the supplied value is a function', () => {

    expect( isFn( () => {} ) ).toBe( true );
    expect( isFn( function(){} ) ).toBe( true );
    expect( isFn() ).toBe( false );
    expect( isFn( '' ) ).toBe( false );
    expect( isFn( true ) ).toBe( false );
    expect( isFn( 123 ) ).toBe( false );

} );