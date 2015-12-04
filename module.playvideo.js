(function (jQuery) {
    jQuery.fn.playvideo = function () {
        return {
            vars: { slide2: null, slide6: null, thumb2: null, thumb3: null, thumb4: null, thumb5: null, youtube: null, timePlayed: null, playerState: null },
            init: function () {
                this.vars.slide2 = jQuery('div.slides div#slide2');
                this.vars.slide6 = jQuery('div.slides div#slide6');
                this.vars.thumb2 = jQuery('div.thumbs div#thumb2');
                this.vars.thumb3 = jQuery('div.thumbs div#thumb3');
                this.vars.thumb4 = jQuery('div.thumbs div#thumb4');
                this.vars.thumb5 = jQuery('div.thumbs div#thumb5');
                this.vars.youtube = jQuery('#youtube');
                this.vars.timePlayed = jQuery("div.slides input#timePlayed");
                this.vars.playerState = jQuery("div.slides input#playerState");
            },

            getYouTubeVideo: function () {
                this.init();
                this.vars.slide6.add(this.vars.youtube).show();
            },

            hideYouTubeVideo: function () {
                this.init();
                try {
                    ytplayer.pauseVideo();
                    this.vars.playerState.data("playerState", ytplayer.getPlayerState());
                    this.vars.timePlayed.data("elapsed", ytplayer.getCurrentTime());
                    this.vars.slide6.add(this.vars.slide2).hide();
                } catch (e) { }
            },

            getVideoState: function () {
                this.init();
                try {
                    if (typeof (ytplayer) == "undefined") {
                    } else {
                        var thumbs = jQuery("div.thumbgallery").find("div.thumbs div.thumb");
                        var s6 = this.vars.slide6.is(":visible");
                        var secondsPlayed = this.vars.timePlayed.data("elapsed");
                        thumbs.each(function (i, value) {
                            var index = jQuery(this).attr('id').substring(5);
                            if (index > 1) {
                                if (jQuery(this).hasClass("hover") && s6) { jQuery.fn.playvideo().hideYouTubeVideo(); }
                            }
                            if (index == 1) {
                                if (jQuery(this).hasClass("hover") && secondsPlayed > 0) { jQuery.fn.playvideo().getVideoAgain(); }
                            }
                        });
                    }
                } catch (e) { }
            },

            getVideoAgain: function () {
                this.init();
                try {
                    var s2 = this.vars.slide2.is(":visible");
                    var i = this.vars.playerState.data("playerState");
                    if (s2 && (i == 2)) { jQuery.fn.playvideo().showYouTubeVideo(); }
                } catch (e) { }
            },

            showYouTubeVideo: function () {
                this.init();
                this.vars.slide6.add(this.vars.youtube).show();
            }
        };
    }
})(jQuery);