(function (jQuery) {
    var MyPlugin = function (element, options) {
        var elem = $(element);
        var obj = this;
        var defaults = {
            'class': 'myplugin'
        };
        var settings = $.extend(defaults, options || {});

        this.publicMethod = function () {
            alert('public method called!');
        };
        this.show = function () {
            console.log('public method called!');
            alert(settings.backgroundColor);
            privateMethod();
        };

        var privateMethod = function () {
            console.log('private method called!');
            jQuery('div.frick').css("background-color", settings.backgroundColor);
            jQuery('div.frack').css("background-color", settings.backgroundColor);
            alert("privateMethod = " + settings.backgroundColor);
        };
    };

    jQuery.fn.myplugin = function (settings) {
        return this.each(function (i, v) {
            var element = $(this);

            // Return early if this element already has a plugin instance
            //if (element.data('myplugin')) return;

            // pass options to plugin constructor
            var myplugin = new MyPlugin(this, settings);
            myplugin.id = i;
            myplugin.element = jQuery(this);
            alert(myplugin.element.attr('id'));
            //alert(myplugin.id);

            // Store plugin object in this element's data
            element.data('myplugin', myplugin);
        });
    };
})(jQuery);