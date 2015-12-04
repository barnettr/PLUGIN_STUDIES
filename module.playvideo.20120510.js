;(function (jQuery) {

    jQuery.fn.playvideo = function (options) {
        return this.each(function () {
            var defaults = {
                slide2: jQuery('div.slides div#slide2'),
                slide6: jQuery('div.slides div#slide6'),
                thumb2: jQuery('div.thumbs div#thumb2'),
                thumb3: jQuery('div.thumbs div#thumb3'),
                thumb4: jQuery('div.thumbs div#thumb4'),
                thumb5: jQuery('div.thumbs div#thumb5'),
                youtube: jQuery('#youtube'),
                timePlayed: jQuery("div.slides input#timePlayed"),
                playerState: jQuery("div.slides input#playerState")
            };
            var options = jQuery.extend({}, defaults, options);

            var getYouTubeVideo = function () {
                try { options.slide6.add(options.youtube).show(); } catch (e) { }
            };
            var hideYouTubeVideo = function () {
                try {
                    ytplayer.pauseVideo();
                    options.playerState.data("playerState", ytplayer.getPlayerState());
                    options.timePlayed.data("elapsedTime", ytplayer.getCurrentTime());
                    options.slide6.add(options.slide2).hide();
                } catch (e) { }
            };
            var getVideoState = function () {
                try {
                    if (typeof (ytplayer) == "undefined") {
                    } else {
                        var thumbs = jQuery("div.thumbgallery").find("div.thumbs div.thumb");
                        var s6 = options.slide6.is(":visible");
                        var t = options.timePlayed.data("elapsedTime");
                        thumbs.each(function (i, value) {
                            var i = jQuery(this).attr('id').substring(5);
                            if (i > 1) {
                                if (jQuery(this).hasClass("hover") && s6) { jQuery.fn.playvideo().hideYouTubeVideo(); }
                            }
                            if (i == 1) {
                                if (jQuery(this).hasClass("hover") && t > 0) { jQuery.fn.playvideo().getVideoAgain(); }
                            }
                        });
                    }
                } catch (e) { }
            };
            var getVideoAgain = function () {
                try {
                    var s2 = options.slide2.is(":visible");
                    var i = options.playerState.data("playerState");
                    if (s2 && (i == 2)) { jQuery.fn.playvideo().showYouTubeVideo(); }
                } catch (e) { }
            };
            var showYouTubeVideo = function () {
                try { options.slide6.add(options.youtube).show(); } catch (e) { }
            };
        });
    }
})(jQuery);