(function( $ ){

    var methods = {
        init : function(options) {

        },
        show : function( ) { // IS   },
        hide : function( ) { // GOOD },
        update : function( content ) { // !!! }
    };

    $.fn.tooltip = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }    
    };


})( jQuery );


$('div').tooltip(); // calls the init method
$('div').tooltip({  // calls the init method
  foo : 'bar'
});
$('div').tooltip('hide'); // calls the hide method
$('div').tooltip('update', 'This is the new tooltip content!'); // calls the update method