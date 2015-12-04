jQuery.fn.messagePlugin = function () {
    var selectedObjects = this;
    return {
        saySomething: function (message) {
            $(selectedObjects).each(function () {
                $(this).html(message);
            });
            return selectedObjects; // Preserve the jQuery chainability 
        },
        anotherAction: function () {
            //...
            return selectedObjects;
        }
    };
}


$('p').messagePlugin().saySomething('I am a Paragraph').css('color', 'red');
