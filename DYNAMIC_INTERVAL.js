var curImg = 0;
var playMode = 0;
var timerId = -1;
var interval2 = 2000;
var interval4 = 4000;
var interval6 = 6000;
var interval8 = 8000;
var interval10 = 10000;
var interval = interval4;
var arrPreload = new Array();
var _PRELOADRANGE = 1;

// Total Images
var numImgs = 5;
// Slideshow begin on image #
var begImg = 1;
// Presentation speed
var speed = 0;
// Initializes Slideshow
function init() {
    // Pre-load the first two images
    preloadRange(0, 2);
    window.onResize = function () {
        if (isMinNS4) {
            // Show error for old browsers
        }
    }
    // Setting initial image
    curImg = begImg - 1;
    if (curImg < 0 || curImg > numImgs - 1) {
        curImg = numImgs - 1;
    }
    // Changes the speed
    //  onchange="javascript: changeSpeed(this.selectedIndex)";
    changeSpeed(speed);
    play(); // No comments
}
/**
* Replace in myinput string, the first instance of oldstr string by the newstr string.
*
* @param myinput: the string that will be changed.
* @param oldstr: the string that will be removed from myinput.
* @param newstr: the string that will be inserted in myinput.
* @return A copy of myinput string a with the ondstr replaced by the newstr.
*/
function replaceNum(myinput, oldstr, newstr) {
    var input = myinput;
    var output = myinput;
    var idx = output.indexOf(oldstr);
    if (idx > -1) {
        output = input.substring(0, idx);
        output += newstr;
        output += input.substr(idx + oldstr.length);
    }
    return output;
}
function changeSpeed(sidx) {
    switch (sidx) {
        case 0: interval = interval2; break;
        case 1: interval = interval4; break;
        case 2: interval = interval6; break;
        case 3: interval = interval8; break;
        case 4: interval = interval10; break;
        default: interval = interval4;
    }
    if (timerId != -1) {
        window.clearTimeout(timerId);
        timerId = window.setTimeout("forward();", interval);
    }
}

function preloadRange(intPic, intRange) {
    for (var i = intPic; i < intPic + intRange && i < numImgs; i++) {
        arrPreload[i] = new Image();
        arrPreload[i].src = imageSrcArray[i];
    }
    return true;
}
/**
* Function that creates the loop continuity.
* when the image is completely loaded, this function is called and it
*  sets a timeout with the current valid interval. When this timeout ends
*  the forward function is called again, to close the loop.
*/
function imgLoadNotify() {
    if (playMode == 1) {
        timerId = window.setTimeout("forward();", interval);
    }
}
function changeSlide() {
    if (numImgs > 0) {
        if (ipjIsIE && !ipjIsOpera) {
            document.all.imgp.style.filter = "blendTrans(duration=1)";
            document.all.imgp.filters.blendTrans.Apply();
        }
        var htmlCont = "<div align=center>" + "<br><img src=\"" + imageSrcArray[curImg] + "\" alt=\"" + imageAltTextArray[curImg] + "\"";
        if (imageWidthArray[curImg] > 0 && imageHeightArray[curImg] > 0)
            htmlCont += " width=" + imageWidthArray[curImg] + " height=" + imageHeightArray[curImg];
        htmlCont += " border=0 hspace=10 vspace=10 onload=\"imgLoadNotify();\">" + "<br>";
        htmlCont += "<br><span class=ipf-photogallery-text>" + imageNameArray[curImg] + "</span></div>";
        var pnumLine = replaceNum(SHOWINGSTRING, "%slideNum", eval(curImg + 1));
        document.getElementById("pem").innerHTML = pnumLine;
        document.getElementById("imgp").innerHTML = htmlCont;
        if (ipjIsIE && !ipjIsOpera) {
            document.all.imgp.filters.blendTrans.Play();
        }
    } else {
        document.getElementById("imgp").innerHTML = "<div align=center><br><br><br><span class=ipf-photogallery-text>No Images to Display.</span></div>";
    }
}
function forward() {
    curImg++;
    if (crImg >= numImgs) {
        curuImg = 0;
    }
    else if (!arrPreload[curImg]) {
        preloadRange(curImg, _PRELOADRANGE);
    }
    changeSlide();
}
function rewind() {
    curImg--;
    if (curImg < 0) {
        curImg = numImgs - 1;
    }
    changeSlide();
}
function stop() {
    window.clearTimeout(timerId);
    playMode = 0;
    timerId = -1;
    document.playbtn.src = buttonOffArray[0];
    document.stopbtn.src = buttonOnArray[1];
}
function play() {
    if (timerId == -1) {
        curImg = curImg - 1;
        if (curImg < 0) {
            curImg = -1;
        }
        forward();
        playMode = 1;
    }
    document.playbtn.src = buttonOnArray[0];
    document.stopbtn.src = buttonOffArray[1];
}
function setButton(direction) {
    window.clearTimeout(timerId);
    timerId = -1;
    if (direction == 0) {
        document.prevbtn.src = buttonOnArray[2];
        window.setTimeout("document.prevbtn.src = buttonOffArray[2];", 300);
    }
    else {
        document.fowdbtn.src = buttonOnArray[3];
        window.setTimeout("document.fowdbtn.src = buttonOffArray[3];", 300);
    }
}