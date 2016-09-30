/**
 * Created by natvet on 14.09.16.
 */

<!-- Start - Nawigacja-->
function toggleMenu() {
    var navLinks = document.getElementById("nav-links"),
        navButton = document.getElementById("nav-button"),
        navDislplay = getComputedStyle(navLinks, null).display;

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
    var closeButton = $(closingButtonsClass),
        sectionToClose = $(sectionsToCloseClass);

    closeButton.click(function () {
        sectionToClose.hide();
    });
}

function showPopup(triggerButtonsClass, popupClass) {
    // * Parameters needs to have this format: '.class-name'
    var triggerButton = $(triggerButtonsClass),
        sectionToShow = $(popupClass);

    triggerButton.click(function () {
        var $usersEmail = $('.users-email').val(),
            emailPatter = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            emailTest = emailPatter.test($usersEmail),
            $checkboxTest = $('input:checked').addClass('checked');

        if (emailTest && $checkboxTest.hasClass('checked')) {sectionToShow.css({'display': 'flex'})}
    })
}

showPopup('.sign-up-button','.popup-window-dimm');
closeSection('.popup-close-button','.popup-window-dimm');

/*End - "Thank-you" window*/