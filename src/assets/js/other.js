$(document).ready(function() {
    //Login animation to center 
    function toCenter() {
        var mainH = $("#main").outerHeight();
        var accountH = $(".account-wall").outerHeight();
        var marginT = (mainH - accountH) / 2;
        if (marginT > 30) {
            $(".account-wall").css("margin-top", marginT - 15);
        } else {
            $(".account-wall").css("margin-top", 30);
        }
    }
    var toResize;
    $(window).resize(function(e) {
        clearTimeout(toResize);
        toResize = setTimeout(toCenter(), 500);
    });

    //Canvas Loading
    var throbber = new Throbber({
        size: 32,
        padding: 17,
        strokewidth: 2.8,
        lines: 12,
        rotationspeed: 0,
        fps: 15
    });
    throbber.appendTo(document.getElementById('canvas_loading'));
    throbber.start();


});