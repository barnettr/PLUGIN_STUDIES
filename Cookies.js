function Get_Cookie(name) {

    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

//  This will retrieve the cookie by name, if the cookie does not exist, it will return false, 
//  so you can do things like if ( Get_Cookie( 'your_cookie' ) ) do something.


(function () {
    var cookies;

    function readCookie(name, c, C, i) {
        if (cookies) { return cookies[name]; }

        c = document.cookie.split('; ');
        cookies = {};

        for (i = c.length - 1; i >= 0; i--) {
            C = c[i].split('=');
            cookies[C[0]] = C[1];
        }

        return cookies[name];
    }

    window.readCookie = readCookie; // or expose it however you want
})();



function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Get my cookie
var cookie =  getCookie('mycookie');


console.log(cookie);

//Session Cookie

$.cookie('cookie_name', 'cookie_value', { expires: null, path: '/', domain: 'yourwebsite.com', secure: true }); 


function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal (j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return null;
}