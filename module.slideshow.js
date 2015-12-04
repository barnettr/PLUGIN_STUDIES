(function (jQuery, idx) {
    /* slideshow by Keith Childers */
    /* updated 5/9/2011 - jmcmurdo */
    /* modified 7/5/2011 - Rick Young to support AJAX slide content */
    jQuery.fn.slideshow = function (interval, xrun, idx) {

        function getUrlVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        var params = {};
        var params_rel = $j(this).attr('rel');
        if (params_rel) {
            params = eval('(' + params_rel + ')');
        };
        var hashidx = getUrlVars()["selectedIndex"];
        var controls = $j('<div class="controls"></div>');
        var leftPaddle = $j('<a name="slideshow:leftpaddle" class="paddle-left" href="javascript:void(0)"> </a>');
        var rightPaddle = $j('<a name="slideshow:rightpaddle" class="paddle-right" href="javascript:void(0)"> </a>');
        var slides = this.children('div.slides').children('div');
        var slideContainer = this.children('div.slides');
        var auto = true;
        if (params.idx) {
        } else {
            var idx = 0;
        }
        if (hashidx) {
            var idx = parseInt(hashidx);
            auto = false;
        }
        var idx2 = 0;
        var SlideContent = '';
        var hoverStopSlide = params.hoverStopSlide;
        if (hoverStopSlide == 'undefined' || hoverStopSlide === 'undefined' || hoverStopSlide == undefined || hoverStopSlide === undefined) {
            hoverStopSlide = 'true';
        };

        if (hoverStopSlide == 'false') {
            slideContainer.mouseover(function () {
                auto = false; //hoverStopSlide;
                clearTimeout(timeOut);
            });
        }

        // get content for slide here using AJAX
        // check to see if slides have a var tag if so load content
        slides.each(function (index) {
            var slide = jQuery(this);
            var VarInfo = slide.find('var');
            //alert(slide.find('var'));
            if (VarInfo) { // var in div exists load content
                // get url from var to load content
                var ContentURL = jQuery.trim(VarInfo.html());
                if (ContentURL != "") {
                    slide.load(ContentURL, function (res, sta, xhr) {
                        if (sta == "error")
                            b.text("Error loading slide content: " + xhr.status + " " + xhr.statusText);
                        var slideTags = jQuery('.slides .control-button');
                        // loop over each tag found
                        slideTags.each(function (index) {
                            var slideTagElement = jQuery(this);
                            var indexId = parseInt(slideTagElement.attr('index'));
                            slideTagElement.click({ index: indexId }, controlButtonClickHandler);
                        });
                    });
                }
            }

        });

        var interval_param = params.interval;
        if (interval_param == 'undefined' || interval_param === 'undefined' || interval_param == undefined || interval_param === undefined) {
            interval_param = 3000;
        };
        var autoInterval = interval_param;

        var timesRun_param = params.xrun;
        if (timesRun_param == 'undefined' || timesRun_param === 'undefined' || timesRun_param == undefined || timesRun_param === undefined) {
            timesRun_param = 1;
        };
        var timesRun = timesRun_param;

        var timeOut;

        if (!slides || slides.length == 0)
            return;

        var gotoSlide = function (i) {
            var e = slides.eq(i);
            var slideId = e.attr('id');
            var slideClass = e.attr('class');
            var s = slides.filter('.selected');
            var c = controls.children().filter('.selected');
            var a = controls.children().eq(i);
            if (e.hasClass('selected'))
                return;
            s.fadeOut().removeClass('selected');
            e.fadeIn().addClass('selected');
            c.removeClass('selected');
            a.addClass('selected');
            if (i == 0) {
                if (auto) {
                    timeOut = setTimeout(autoAdvance, 5000);
                }
            } else if (i > 0) {
                if (auto) {
                    timeOut = setTimeout(autoAdvance, autoInterval);
                }
            } else {
                clearTimeout(timeOut);
            }
        };


        var nextSlide = function () {
            //alert("idx = " + idx);
            //alert("slides length - 1 = " + (slides.length - 1));
            if (idx == (slides.length - 1)) {
                idx = 0;
            } else {
                idx = (idx + 1);
            }
            return gotoSlide(idx);
        };

        var prevSlide = function () {
            if (idx == 0) {
                idx = (slides.length - 1);
            } else {
                idx = (idx - 1);
            }
            return gotoSlide(idx);
        };


        leftPaddleClickHandler = function (event) {
            auto = false;
            prevSlide();
        };

        rightPaddleClickHandler = function (event) {
            auto = false;
            nextSlide();
        };

        controlButtonClickHandler = function (event) {
            auto = false;
            idx = event.data.index;
            gotoSlide(idx);
        };
        var stopSlideId = params.stopSlideId;
        if (stopSlideId == 'undefined' || stopSlideId === 'undefined' || stopSlideId == undefined || stopSlideId === undefined) {
            stopSlideId = '';
        };

        autoAdvance = function (event) {
            if (auto) {
                if (idx == slides.length - 1) {
                    idx2 = idx2 + 1;
                    if (idx2 >= timesRun) {
                        auto = false;
                        if (stopSlideId != "") {
                            gotoSlide(stopSlideId - 1);
                        }
                    } else {
                        nextSlide();
                    }
                } else {
                    nextSlide();
                }
            };
        };

        slides.each(function () {
            var i = slides.index(this);
            var a = $j('<a class="control-button" href="javascript:void(0)" index="' + i + '"> </a>');
            a.click({ index: i }, controlButtonClickHandler);
            controls.append(a);
        });

        leftPaddle.click(leftPaddleClickHandler);
        rightPaddle.click(rightPaddleClickHandler);

        this.append(controls);
        this.append(leftPaddle);
        this.append(rightPaddle);

        gotoSlide(idx);

    };

})(jQuery);