/**
 * Created by natvet on 14.09.16.
 */

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

(function() {
    document.getElementById("nav-button").setAttribute("onclick", "toggleMenu()");
    var w = window.innerWidth;
    if (w <= 600) {
        document.getElementById("nav-links").setAttribute("onclick", "toggleMenu()");
    }
})();
<!-- End - Nawigacja-->

/*Start - "Thank-you" window*/

function closeSection(closingButtonsClass, sectionsToCloseClass) {
    // * Parameters needs to have this format: '.class-name'
    var closeButton = $(closingButtonsClass);
    var sectionToClose = $(sectionsToCloseClass);

    closeButton.click(function () {
        sectionToClose.hide();
    });
}

function showSection(triggerButtonsClass, sectionToShowClass) {
    var triggerButton = $(triggerButtonsClass);
    var sectionToShow = $(sectionToShowClass);

    triggerButton.click(function () {
        sectionToShow.css({'display': 'flex'});
    })
}

showSection('.sign-up-button','.popup-window-dimm');
closeSection('.popup-close-button','.popup-window-dimm');

/*End - "Thank-you" window*/