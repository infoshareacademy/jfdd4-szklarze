/**
 * Created by natvet on 14.09.16.
 */

<!-- Start - Nawigacja-->
$(document).ready(function () {

    function toggleMenu() {
        var navLinks = document.getElementById("nav-links");
        var navButton = document.getElementById("nav-button");
        var navDislplay = getComputedStyle(navLinks, null).display;

        if (navDislplay == "flex") {
            navLinks.style.display = "none";
            navButton.style.backgroundImage = "url(images/icon-white-menu.svg)";
        } else {
            navLinks.style.display = "flex";
            navButton.style.backgroundImage = "url(images/icon-white-menu-close.svg)";
        }
    }

    (function () {
        document.getElementById("nav-button").setAttribute("onclick", "toggleMenu()");
        var w = window.innerWidth;
        if (w <= 600) {
            document.getElementById("nav-links").setAttribute("onclick", "toggleMenu()");
        }
    })();


    $(window).scroll(function () {
        var position = $(this).scrollTop();

        $('.nav-top > ul > li > a').removeClass('active');

        $('section').each(function () {
            var target = $(this).offset().top;
            var id = $(this).attr('id');

            if ($(this).hasClass('highlight-nav-top') && (position >= target)) {

                $('.nav-top > ul > li > a').removeClass('active');
                $('.nav-top > ul > li > a[href=#' + id + ']').addClass('active');
            }
        });
    });

});
<!-- End - Nawigacja-->
