$(function() {
    "use strict";
    
    setTimeout(function() {
        $(".page-loader-wrapper").fadeOut()
    }, 50)
});

$(document).ready(function() {
    $(".main-menu").metisMenu(), $(".cwidget-scroll").slimScroll({
        height: "263px",
        wheelStep: 10,
        touchScrollStep: 50,
        color: "#efefef",
        size: "2px",
        borderRadius: "3px",
        alwaysVisible: !1,
        position: "right"
    });

    $(".btn-toggle-fullwidth").on("click", function() {
        $("body").hasClass("layout-fullwidth") ? $("body").removeClass("layout-fullwidth") : $("body").addClass("layout-fullwidth"), $(this).find(".fa").toggleClass("fa-arrow-left fa-arrow-right")
    });

    $(".btn-toggle-offcanvas").on("click", function() {
        $("body").toggleClass("offcanvas-active")
    });

    $("#main-content").on("click", function() {
        $("body").removeClass("offcanvas-active")
    });

    $(".dropdown").on("show.bs.dropdown", function() {
        $(this).find(".dropdown-menu").first().stop(!0, !0).animate({
            top: "100%"
        }, 200)
    });

    $(".dropdown").on("hide.bs.dropdown", function() {
        $(this).find(".dropdown-menu").first().stop(!0, !0).animate({
            top: "80%"
        }, 200)
    });

    $('.navbar-form.search-form input[type="text"]').on("focus", function() {
        $(this).animate({
            width: "+=50px"
        }, 300)
    }).on("focusout", function() {
        $(this).animate({
            width: "-=50px"
        }, 300)
    }), 0 < $('[data-toggle="tooltip"]').length && $('[data-toggle="tooltip"]').tooltip(), 0 < $('[data-toggle="popover"]').length && $('[data-toggle="popover"]').popover(), $(window).on("load", function() {
        $("#main-content").height() < $("#left-sidebar").height() && $("#main-content").css("min-height", $("#left-sidebar").innerHeight() - $("footer").innerHeight())
    });
});
