/**
 * Created by natvet on 14.09.16.
 */

$(document).ready(function () {

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

    // Start - Game timer

    // Kliknięcie przycisku 'Start' rozpoczyna odliczanie XX sekund.
    // Licznik wyświetla pozostałą ilość czasu.
    // W trakcie gry przycisk 'Start' jest nieaktywny.
    // Po zakończeniu gry przycisk 'Start' jest ponownie aktywny.
    // Po upływie czasu gra się zatrzymmuje.

    var timeAmount = 12;//Set time amount here, max 60 seconds.
    $('.game-timer h4').text('Czas: 00:' + timeAmount);
    $('button.game-start-button').click(function () {
        $(this).attr('disabled', true).addClass('disabled');
        var timeCounter = setInterval(function () {
            timeAmount--;
            if (timeAmount == 0) {
                clearInterval(timeCounter);
                $('button.game-start-button').attr('disabled', false).removeClass('disabled');
                timeAmount = 12;//Set time amount here, max 60 seconds.
                //Function to stop game
            }
            $('.game-timer h4').text('Czas: 00:' + (timeAmount < 10 ? '0' + timeAmount : timeAmount));
        }, 1000); //One second interval
    });
    // End - Game timer

});