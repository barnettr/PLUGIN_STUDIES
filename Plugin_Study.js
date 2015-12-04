(function (jQuery) {
    var privateFunctionHide = function () {
        jQuery('.className').fadeOut('slow', function () {
            jQuery('.className').remove();
        });

    }
    var privateFunctionShow = function () {
        jQuery('.className').fadeIn('slow', function () {
            jQuery('.className').append('<ul>').css({
                color: "black",
                "font-weight": "normal"
            });
        });

    }
    var privateFunctionUpdate = function () {
        jQuery('li.className').each(function () {
            $(this).css({
                color: "red",
                "font-weight": "bold"
            });
        });
    }

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var settings = $this.data('pluginName');

                if (typeof (settings) == 'undefined') {

                    var defaults = {
                        propertyName: 'value',
                        value: '',
                        hidden: false,
                        initialText: null,
                        onSomeEvent: function () { },
                        clickCallback: function () { }
                    }

                    settings = jQuery.extend({}, defaults, options);
                    $this.data('pluginName', settings);

                } else {

                    settings = jQuery.extend({}, settings, options);
                }
                //alert(settings.hidden);
                // run code here


            });
            hook('onInit');
        },
        destroy: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                $this.remove('pluginName');
            });
        },
        disable: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                $this.attr("disabled", "true");
                $this.data('disabled', { isDisabled: 'true' });
            });
        },
        enable: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                if ($this.data('disabled').isDisabled == 'false') { return; }
                $this.removeAttr('disabled');
                $this.data('disabled', { isDisabled: 'false' });
            });
        },
        val: function (options) {
            var someValue = this.eq(0).html();
            if (options) {
                this.data('storeddata', options);
            } else {
                alert(this.data('storeddata'));
            }
            //return someValue;
        },
        reset: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                if ($this.data('initialText').myText == "") { return }
                $this.find('span.title').text($this.data('initialText').myText);
                $this.data('hidden', { isHidden: 'false' });
            });
        },
        show: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                if ($this.data('hidden').isHidden == 'false') { return; }
                jQuery('.className').fadeIn('slow');
                $this.data('hidden', { isHidden: 'false' });
            });
        },
        hide: function () {
            return $(this).each(function () {
                var $this = $(this);
                //if ($this.data('hidden').isHidden == 'true') { return; }
                jQuery('.className').fadeOut('slow');
                $this.data('hidden', { isHidden: 'true' });
            });
        },
        update: function (options) {
            return $(this).each(function (event) {
                var $this = $(this);
                var update = "My text is changed!";
                var initialText = $this.find('span.title').html();
                $this.data('initialText', { myText: initialText });
                $this.find('span.title').html(update);
                $this.data('updated', { isUpdated: 'true' });
                if (event && event.stopPropagation === true) {
                    event.stopPropagation();
                }
            });
        },
        hook: function (hookName) {
            if (options[hookName] !== undefined) {
                // Call the user defined function.
                // Scope is set to the jQuery element we are operating on.
                options[hookName].call(element);
            }
        }
    };

    jQuery.fn.pluginName = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);

        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pluginName');
            return this;
        }

        return method.apply(this, arguments);

    }

})(jQuery);