/**
 * Created by natvet on 14.09.16.
 */

// Start - Nawigacja
$(document).ready(function () {
    $('#nav-button, #nav-links li').click(function () {
        $('#nav-links').toggleClass('toggle-menu');
        $('#nav-button').toggleClass('change-icon');
    });
});

$(document).ready(function() {
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

// End - Nawigacja

// Start - "Thank-you" window

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
            $checkboxTest = $('input[type="checkbox"]').prop("checked");
        if (emailTest && $checkboxTest) {
            $sectionToShow.css({'display': 'flex'})
        }
    })
}

showPopup('.sign-up-button', '.popup-window-dimm');
closeSection('.popup-close-button', '.popup-window-dimm');

// End - "Thank-you" window

// Start - mix-button

    function clearCells() {
        var cells = $('td');
        return cells.empty();
    }

    function findEmptyCells() {
        var emptyCells = $('td:empty').addClass('empty-cell');
        return emptyCells;
    }

    function createRandomElement() {
        var elements = [
            'icon-black-mustache-v1',
            'icon-black-mustache-v2',
            'icon-black-mustache-v3',
            'icon-blue-flipflops',
            'icon-brown-bottle',
            'icon-green-bottle',
            'icon-green-onion',
            'icon-grey-bag',
            'icon-onion-brown',
            'icon-purple-onion',
            'icon-red-beetroot',
            'icon-yellow-pint'
        ];
        var randomNumber = Math.floor(Math.random() * elements.length);
        img = new Image();
        img.src = 'images/game-icons/' + elements[randomNumber] + '.svg';
        img.className = 'img-element';
        return img;
    }

    function addCreatedRandomElementToEmptyCell() {
        var emptyCell = $('.empty-cell');
        emptyCell.each(function () {
            $(this).append(createRandomElement());
        });
    }

    $('.game-mix-button').click(function () {
        clearCells();
        findEmptyCells();
        createRandomElement();
        addCreatedRandomElementToEmptyCell();
    });
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

// End - mix-buton
