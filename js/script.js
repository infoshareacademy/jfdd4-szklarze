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
        });
    }

    $('.game-mix-button').click(function () {
        clearCells();
        createRandomElement();
        findEmptyCells();
        addCreatedRandomElementToEmptyCell();
    });

// End - mix-buton

// Start - Game


    function generateTable(size) {
        var $table = $('.game-table'),
            $tbody = $('<tbody>');

        $table
            .empty()
            .css('display','flex')
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
    }

    function clearPoints() {
        $('.points').text('0');
    }

    function isElementFound() {
        var $elementToFind = $('.game-find-this-img').find('.img-element'),
            $imgElement = $('.img-element'),
            $elementToFindSrc = $elementToFind.attr('src'),
            points = 0;

        $imgElement.click(function () {
            var $clickedElement = $(this);

            isGameFinished();

            if ( $elementToFindSrc === $(this).attr('src') ) {
                points++;
                $('.points').text(points);
                $clickedElement.css('background', 'green').fadeOut(1500);
                setTimeout(function () {
                    $clickedElement.remove();
                }, 1500);
            } else {
                $clickedElement.css('background', 'red');
            }
        });
    }

    function isMatchingElementLeft() {
        var $elementToFind = $('.game-find-this-img').find('.img-element'),
            $elementToFindSrc = $elementToFind.attr('src'),
            $elementsOnBoard = $('.game-table').find('.img-element').toArray(),
            matchingElementsCounter = 0;

        $elementsOnBoard.forEach(function (elementOnBoard) {
            var $elementOnBoardSrc = $(elementOnBoard).attr('src');
            if ($elementOnBoardSrc == $elementToFindSrc) matchingElementsCounter++;
        });
        return matchingElementsCounter > 1;
    }

    (function startGame() {
        var $gameStartButton = $('.game-start-button');

        $gameStartButton.click(function () {
            $('.game-instructions-summury').hide();
            generateTable(10);
            // startTimer();
            clearPoints();
            createElementToFind();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
            isElementFound();
        })
    })();


    function isTimeOut() {
        var $time = $('.game-timer').find('h4').text();
        return $time == '00:00';
    }

    function showSummary() {
        var $summary = $('.game-instructions-summary'),
            points = $('.points').text(),
            $table = $('.game-table');

        $table.hide();
        $summary.empty();
        $summary.css('display', 'flex');
        $summary.append('h3').text('Koniec gry!');
            // .find('p').text('Zdobyłeś <br>' + points + '<br> punktów');
        console.log($summary, points);

    }

    function isGameFinished() { /*fukncje trzeba dodać do kliknięcia i uruchomić po
     upływie czasu*/
        if ( !isMatchingElementLeft() ) {
            // stopTimer();
            // addTimeBonus();
            showSummary();
        }
        if ( isTimeOut() ) {
            // takePointsForLeftElements();
            showSummary();
        }
    }

// End - Game

});
