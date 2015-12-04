// Description: displays the amount of time until the "dateFuture" entered below.

/* Notes 
* the month entered must be one less than current month. ie; 0=January, 11=December
* the hour is in 24 hour format. 0=12am, 15=3pm etc
* format: dateFuture = new Date(year,month-1,day,hour,min,sec)
* example: dateFuture = new Date(2003,03,26,14,15,00) = April 26, 2003 - 2:15:00 pm
*
* Arguments:
* selector - id or class to update with the date time
* 
* datevalue - date time object to work out the difference from
*/


jQuery.countdown = function (selector, datevalue) {

    var dateFuture = datevalue;
    dateNow = new Date();
    amount = dateFuture.getTime() - dateNow.getTime();
    delete dateNow;

    // catch past dates
    if (amount < 0) {
        $(selector).html("Now!");
    }

    // date is in the future, calculate the diff
    else {
        days = 0; hours = 0; mins = 0; secs = 0; out = "";

        amount = Math.floor(amount / 1000); //kill the "milliseconds" so just secs

        days = Math.floor(amount / 86400); //days
        amount = amount % 86400;

        hours = Math.floor(amount / 3600); //hours
        amount = amount % 3600;

        mins = Math.floor(amount / 60); //minutes
        amount = amount % 60;

        secs = Math.floor(amount); //seconds

        if (days != 0) { out += days + " day" + ((days != 1) ? "s" : "") + ", "; }
        if (days != 0 || hours != 0) { out += hours + " hour" + ((hours != 1) ? "s" : "") + ", "; }
        if (days != 0 || hours != 0 || mins != 0) { out += mins + " minute" + ((mins != 1) ? "s" : "") + ", "; }
        out += secs + " seconds";
        $(selector).html(out);

        // run it all again
        setTimeout(function () {
            $.countdown(selector, datevalue);
        }, 1000);

    }

};