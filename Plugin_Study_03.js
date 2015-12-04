(function ($) {
    // This is used to create AutoComplete object that are attatched to each element that is matched
    // when the plugin is invoked
    var AutoCompleteEx = function (options, acx) {

        // PRIVATE VARIABLES
        var timerID;
        var input;

        //Give Div Correct Class & Add <ul> w/ input item to it
        acx.addClass("autoCompleteEx");
        acx.html("<ul><li class=\"input\"><input type=\"text\"/></li></ul>");

        //Grab Input As JQ Object
        input = $("input", acx);

        //Wireup Div
        acx.click(function () {
            input.focus().val(input.val());
        });


        //Wireup Input
        input.keydown(function (e) {
            var kc = e.keyCode;
            if (kc == 13)   //Enter
            {

            }
            else if (kc == 27)  //Esc
            {

            }
            else {
                //Resize TextArea To Input
                var width = 50 + (_txtArea.val().length * 10);
                _txtArea.css("width", width + "px");
            }
        });

        // PUBLIC METHODS

        this.setTimerID = function (id) {
            timerID = id;
        };

        this.getTimerID = function () {
            return timerID;
        };

    };


    //Attach this new method to jQuery   
    $.fn.autoCompleteEx = function (options) {
        //Merge Given Options W/ Defaults, But Don't Alter Either
        var opts = $.extend({}, $.fn.autoCompleteEx.defaults, options);

        //Iterate over the current set of matched elements   
        return this.each(function () {
            var acx = $(this); //Get JQuery Version Of Element (Should Be Div)

            // creating a new AutoCompleteEx object and attach to the element's data, if not already attached
            if (!acx.data('autoCompleteEx')) {
                acx.data('autoCompleteEx', new AutoCompleteEx(options, acx));
            }

        });   //End Each JQ Element

    }; //End autoCompleteEx()

    //Default Settings
    $.fn.autoCompleteEx.defaults =
{
    minChars: 2,
    delay: 300,
    maxItems: 1
};

    //End Of Closure
})(jQuery);

//  You can call the methods like this:

$("div#someDiv").autoCompleteEx();
$("div#someDiv").data('autoCompleteEx').setTimerID(123);
var timerId = $("div").data('autoCompleteEx').getTimerID();
console.log(timerId); // outputs '123'

//  And if you are instantiating more than one:

$("div.someDiv").autoCompleteEx();
$("div.someDiv").eq(0).data('autoCompleteEx').setTimerID(123);
$("div.someDiv").eq(1).data('autoCompleteEx').setTimerID(124);
var firstTimerId = $("div").eq(0).data('autoCompleteEx').getTimerID();
var secondTimerId = $("div").eq(1).data('autoCompleteEx').getTimerID();
console.log(firstTimerId); // outputs '123'
console.log(secondTimerId); // outputs '124'

