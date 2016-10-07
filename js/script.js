/**
 * Created by natvet on 14.09.16.
 */
$(document).ready(function () {

// Start - Nawigacja

    (function toggleMenu() {
        $('#nav-button, #nav-links li').click(function () {
            $('#nav-links').toggleClass('toggle-menu');
            $('#nav-button').toggleClass('change-icon');
        });
    })();

    (function highlightButtonsOnScroll() {
        var sections = $('section'),
            nav = $('.nav-top'),
            nav_height = nav.outerHeight();

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
    })();

// End - Nawigacja


// Start - Sign-up

    $('form').submit(function (event) {
        var formData = {
            'email': $('input[name=email]').val(),
            'receiver': 'szklarze.isa@gmail.com'
        };
        $.ajax({
            type: 'POST',
            url: 'http://tools.is-academy.pl/mailer.php',
            data: formData,
            dataType: 'text'
        })
            .done(function (data) {
                console.log(data);
            })
            .fail(function (data) {
                console.log(data);
            });
        event.preventDefault();
    });


// End - Sign-up


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

        $triggerButton.click(function () {
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
        return $('td:empty').addClass('empty-cell');
    }

    function createRandomElement() {
        var elements = [
            // 'icon-black-mustache-v1',
            'icon-black-mustache-v2',
            // 'icon-black-mustache-v3',
            // 'icon-blue-flipflops',
            'icon-brown-bottle',
            'icon-green-bottle',
            'icon-green-onion',
            // 'icon-grey-bag',
            'icon-onion-brown',
            'icon-purple-onion',
            'icon-red-beetroot'
            // 'icon-yellow-pint'
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
            $(this).removeClass('empty-cell');
        });
    }

    $('.game-mix-button').click(function () {
        clearCells();
        createRandomElement();
        findEmptyCells();
        addCreatedRandomElementToEmptyCell();
    });

// End - mix-buton

// Start - Game timer

    // Kliknięcie przycisku 'Start' rozpoczyna odliczanie XX sekund.
    // Licznik wyświetla pozostałą ilość czasu.
    // W trakcie gry przycisk 'Start' jest nieaktywny.
    // Po zakończeniu gry przycisk 'Start' jest ponownie aktywny.
    // Po upływie czasu gra się zatrzymmuje.

    var timeAmount = 15;//Set time amount here, max 60 seconds.
    $('.game-timer').text('Czas: 00:' + timeAmount);
    $('button.game-start-button').click(function () {
        $(this).attr('disabled', true).addClass('disabled');
        var timeCounter = setInterval(function () {
            timeAmount--;
            if (timeAmount == 0) {
                clearInterval(timeCounter);
                $('button.game-start-button').attr('disabled', false).removeClass('disabled');
                timeAmount = 15;//Set time amount here, max 60 seconds.
                //Function to stop game
            }
            $('.game-timer').text('Czas: 00:' + (timeAmount < 10 ? '0' + timeAmount : timeAmount));
        }, 1000); //One second interval
    });

// End - Game timer

// Start - Game

    function generateTable(size) {
        var $table = $('.game-table'),
            $tbody = $('<tbody>');

        $table
            .empty()
            .css('display','inline-block')
            .append($tbody);

        for (var rowCount=1; rowCount <= size; rowCount++){
            var $row = $('<tr>');

            $tbody.append($row);
            for (var cellCount=1; cellCount <= size; cellCount++){
                var $cell = $('<td>')
                    .attr('data-row',rowCount)
                    .attr('data-col',cellCount);
                $row.append($cell);
            }
        }
    }

    function createElementToFind() {
        var $elementToFind = $('.game-find-this-img');
        $elementToFind.find('img').remove();
        $elementToFind.append(createRandomElement());
        $elementToFind.find('.img-element').removeClass();
        $elementToFind.find('img').addClass('img-element-to-find');
    }

    function clearPoints() {
        $('.points').text('0');
    }

    function findElementOnClick() {
        var $elementToFind = $('.game-find-this-img').find('.img-element-to-find'),
            $imgElement = $('.img-element'),
            $elementToFindSrc = $elementToFind.attr('src'),
            points = 0;

        $imgElement.click(function () {
            var $clickedElement = $(this);

            if ( $elementToFindSrc === $(this).attr('src') ) {
                points++;
                $('.points').text(points);
                $clickedElement.css('background', 'green').fadeOut(500);
                setTimeout(function () {
                    $clickedElement.remove();
                    findEmptyCells();
                }, 500);
            } else {
                $clickedElement.css('background', 'red');
            }
            isGameFinished();
        });
    }

    function isTimeOut() {
        var $time = $('.game-timer').find('h4').text();
        return $time == '00:00';
    }

    function isMatchingElementLeft(getLeftElementsConut) {
        var $elementToFind = $('.game-find-this-img').find('.img-element-to-find'),
            $elementToFindSrc = $elementToFind.attr('src'),
            $elementsOnBoard = $('.game-table').find('.img-element').toArray(),
            matchingElementsCounter = 0;

        $elementsOnBoard.forEach(function (elementOnBoard) {
            var $elementOnBoardSrc = $(elementOnBoard).attr('src');
            if ($elementOnBoardSrc == $elementToFindSrc) matchingElementsCounter++;
        });

        if (getLeftElementsConut != undefined)
            return matchingElementsCounter;
        else
            return matchingElementsCounter > 1;
    }

    function showSummary() {
        $('.game-summary').show();
        $('.game-table-container').hide();
        $('.game-panel').hide();
        // var $summary = $('.game-instructions'),
        //     pointsCount = $('.points').text(),
        //     $table = $('.game-table'),
        //     $head = $('<h2>').text('Koniec gry!'),
        //     $pointsTitle = $('<p>').append('Liczba zdobytych złotówek to:'),
        //     $points = $('<h1>').text(pointsCount);
        //
        // $table.hide();
        // $summary.empty();
        // $summary.css('display', 'inline-block');
        // $summary.append($head).append($pointsTitle).append($points);
    }

    function takePointsForLeftElements() {
        var leftElements = isMatchingElementLeft(true),
            $pointsEarnead = $('.points'),
            points = $pointsEarnead.text() - Number(leftElements);

        if (points < 0) points = 0;

        $pointsEarnead.text(points);
    }

    (function showGame() {
        var $gameShowButton = $('.game-show-button');

        $gameShowButton.click(function () {
            $('.game-instructions').hide();
            $('.game-summary').hide();
            $('.game-table-container').show();
            $('.game-panel').show();
            generateTable(10);
            // startTimer();
            clearPoints();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
        })
    })();

    (function startGame() {
        var $gameStartButton = $('.game-start-button');

        $gameStartButton.click(function () {
            $('.game-instructions').hide();
            // startTimer();
            clearPoints();
            createElementToFind();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
            findElementOnClick();
        })
    })();

    function isGameFinished() { /*fukncje trzeba dodać do kliknięcia i uruchomić po
     upływie czasu*/
        if ( !isMatchingElementLeft() ) {
            // stopTimer();
            // addTimeBonus();
            showSummary();
        }
        if ( isTimeOut() ) {
            takePointsForLeftElements();
            showSummary();
        }
    }

// End - Game

});
