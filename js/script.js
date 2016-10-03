/**
 * Created by natvet on 14.09.16.
 */

<!-- Start - Nawigacja-->
$(document).ready(function () {
    $('#nav-button, #nav-links li').click(function () {
        $('#nav-links').toggleClass('toggle-menu');
        $('#nav-button').toggleClass('change-icon');
    });
});
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
    var $triggerButton = $(triggerButtonsClass),
        $sectionToShow = $(popupClass);

    $triggerButton.click(function (event) {
        event.preventDefault();
        /*WARNING! This is line temporary! It disables
         submitting!*/

        var $usersEmail = $('.users-email').val(),
            emailPattern = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            emailTest = emailPattern.test($usersEmail),
            $checkboxTest = $('input:checked').addClass('checked');

        if (emailTest && $checkboxTest.hasClass('checked')) {
            $sectionToShow.css({'display': 'flex'})
        }
    })
}

showPopup('.sign-up-button', '.popup-window-dimm');
closeSection('.popup-close-button', '.popup-window-dimm');

/*End - "Thank-you" window*/