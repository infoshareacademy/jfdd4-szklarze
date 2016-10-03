/**
 * Created by natvet on 14.09.16.
 */

$(document).ready(function() {

    <!-- Start - Nawigacja-->
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

    var sections = $('section')
        , nav = $('.nav-top')
        , nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
        nav.find('a').removeClass('active');
        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos + 200 >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

<!-- End - Nawigacja-->

});

<!-- Start - Game-->

// kod tymczasowy - w tym miejscu należy połączyć elementy gry TODO: usunąć ten kod po połączeniu elementów gry

$('.game-find-this-img').addClass('game-element1');
$('.game-table').find('td:nth-child(odd)').addClass('game-element1');
$('.game-table').find('td:nth-child(even)').addClass('game-element2');

// koniec kodu tymczasowego


<!-- End - Game-->