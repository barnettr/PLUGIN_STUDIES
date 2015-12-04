var myMessage = $.MessageBox(); myMessage.Show();


jQuery.MessageBox = function () {
    var show = function () {
        // something...
    }
    var hide = function () {
        // something...
    }
    return {
        show: show,
        hide: hide
    }
}


$.myFunc = $.fn.myFunc = function (first, second) {
    if (!(this instanceof $)) {
        return $.fn.myFunc.apply($('<div>'), arguments);
    }
    // begin plugin code here:
    return this.each(function () {
        $(this).text(first + ' ' + second);
    });
};

// now you can call myFunc in two ways:

$('<div>').myFunc('foo', 'bar').appendTo('body')

$.myFunc('bar', 'foo').appendTo('body');

