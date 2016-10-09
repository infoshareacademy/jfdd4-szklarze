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
        event.preventDefault();
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
        this.reset();
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
        return cells.empty().removeClass('selected');
    }

    function findEmptyCells() {
        return $('td:empty').addClass('empty-cell');
    }

    function createRandomElement() {
        var elements = [
            'icon-beer',
            'icon-carrot',
            'icon-mustache',
            'icon-onion',
            'icon-sausage',
            'icon-steak'
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

    function setTime(time) {
        $('.game-timer').text('Czas: 00:' +
            (time < 10 ? '0' + time : time));
    }

    function getTimeLeft() {
        var leftTime = $('.game-timer').text();
        return Number(leftTime.slice(9));
    }

    function disableStartButton() {
        $('button.game-start-button').attr('disabled', true).addClass('disabled');
    }

    function enableStartButton() {
        $('button.game-start-button').attr('disabled', false).removeClass('disabled');
    }

    function startTimer(time) {
        var timeAmount = time;
        setTime(timeAmount);
        disableStartButton();
        var timeCounter = setInterval(function () {
            timeAmount--;
            setTime(timeAmount);
            if (timeAmount == 0) {
                setTime(timeAmount);
                isGameFinished();
            }
            if (timeAmount == 0 || isMatchingElementLeft(true) == 0) {
                clearInterval(timeCounter);
                enableStartButton();
            }
        }, 1000);
    }

// End - Game timer

// Start - Game

    function generateTable(size) {
        var $table = $('.game-table'),
            $tbody = $('<tbody>');

        $table
            .empty()
            .css('display','flex')
            .append($tbody);

        for (var rowCount = 1; rowCount <= size; rowCount++) {
            var $row = $('<tr>');

            $tbody.append($row);
            for (var cellCount = 1; cellCount <= size; cellCount++) {
                var $cell = $('<td>')
                    .attr('data-row', rowCount)
                    .attr('data-col', cellCount);
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

            if ($elementToFindSrc === $(this).attr('src')) {
                points++;
                $('.points').text(points);
                $clickedElement.css('background', '#888').fadeOut(300);
                setTimeout(function () {
                    $clickedElement.remove();
                    findEmptyCells();
                }, 300);
            }
            setTimeout(function () {
                isGameFinished();
            }, 300);

        });
    }

    function isTimeOut() {
        var $time = $('.game-timer').text();
        return $time == 'Czas: 00:00';
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
            return matchingElementsCounter > 0;
    }

    function showSummary() {
        var pointsCount = $('.points').text();
        $('.game-summary').show();
        $('.game-table').hide();
        $('.game-panel').hide();
        $('.game-score').text(pointsCount);
    }

    function takePointsForLeftElements() {
        var leftElements = isMatchingElementLeft(true),
            $pointsEarnead = $('.points'),
            points = Number($pointsEarnead.text()) - Number(leftElements);

        if (points < 0) points = 0;

        $pointsEarnead.text(points);
    }

    function addTimeBonus() {
        var $pointsEarnead = $('.points'),
            points = Number($pointsEarnead.text()) + getTimeLeft();

        $pointsEarnead.text(points);
    }

    function showGame() {
        var $gameShowButton = $('.game-show-button');

        $gameShowButton.click(function () {
            $('.game-instructions').hide();
            $('.game-summary').hide();
            $('.game-table').css('display','flex');
            $('.game-panel').css('display','flex');
            generateTable(10);
            clearPoints();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
        })
    }
    showGame();

    function startGame() {
        var $gameStartButton = $('.game-start-button');

        $gameStartButton.click(function () {
            $('.game-instructions').hide();
            startTimer(2);//Set time amount here, max 30 seconds.
            clearPoints();
            createElementToFind();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
            findElementOnClick();
        })
    }
    startGame();

    function isGameFinished() {
        if (!isMatchingElementLeft()) {
            addTimeBonus();
            showSummary();
        }
        if (isTimeOut()) {
            takePointsForLeftElements();
            showSummary();
        }
    }

    closeSection('.game-close-button', '.game');

    function showSection(triggerButtonsClass, popupClass) {
        // * Parameters needs to have this format: '.class-name'
        var $triggerButton = $(triggerButtonsClass),
            $sectionToShow = $(popupClass);

        $triggerButton.click(function () {
            $sectionToShow.show();
        })
    }

    showSection('.beer-img', '.game');

    // Start Game next level
    function showGameNextLevel() {
        var $gameShowButtonNextLevel = $('.game-show-button-next-level');

        $gameShowButtonNextLevel.click(function () {
            $('.game-instructions').hide();
            $('.game-summary').hide();
            $('.game-table').css('display','flex');
            $('.game-panel').css('display','flex');
            $('.game-panel > .game-mix-button').css('display', 'flex');
            $('.game-panel > h4:first').hide();
            $('.game-find-this-img').hide();
            $('.game-start-button').hide();
            $('.game-start-button-next-level').show();
            generateTable(10);
            clearPoints();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
        })
    }

    showGameNextLevel();

    function startGameNextLevel() {
        var $gameStartButtonNextLevel = $('.game-start-button-next-level');

        $gameStartButtonNextLevel.click(function () {
            $('.game-instructions').hide();
            startTimer(2);//Set time amount here, max 30 seconds.
            clearPoints();
            clearCells();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
        })
    }
    startGameNextLevel();

        // Start - Movement of Player

    function selectCell() {
        var $cell = $('td');

        $cell.click( function () {
            var $numberOfSelectedCells = $('.selected').length;

            if ( $numberOfSelectedCells == 0 ) {
                addClassSelected($(this));
            }
            else if ( $numberOfSelectedCells == 1) {
                checkCellPosition($(this));
            }
        })
    }

    function addClassSelected(cell) {
        cell.addClass('selected')
    }

    function changeContentsOfCell(cell) {
        addClassSelected(cell);
        setTimeout( function () {
            switchElementsBetweenCells(cell)
        }, 700)
    }

    function invalidMovementOfPalyer(cell) {
        var alertMessage = 'Niedozwolony ruch!' + ' ' + 'Możesz wybrać element sąsiadujący z wcześniej zaznaczonym.';

        alert(alertMessage);
        cell.css('background-color', 'red');
        setTimeout(function () {
            cell.removeAttr('style')
        }, 300);
    }

    function checkCellPosition(cell) {
        var rowFirstSelectedCell = $('selected').data('row'),
            columnFirstSelectedCell = $('selected').data('col'),
            rowSecondSelectedCell = cell.data('row'),
            columnSeconSelectedCell = cell.data('col');

        if ( (columnFirstSelectedCell == columnSeconSelectedCell) && (Math.abs(rowFirstSelectedCell - rowSecondSelectedCell) == 1) ) {
            changeContentsOfCell(cell);
        }
        else if ( (rowFirstSelectedCell == rowSecondSelectedCell) && (Math.abs(columnFirstSelectedCell - columnSeconSelectedCell) == 1) ) {
            changeContentsOfCell(cell);
        }
        else {
            invalidMovementOfPalyer(cell);
        }
    }

    function switchElementsBetweenCells(cell) {
        var secondSelectedCell = cell,
            secondSelectedElement = cell.children();



        clearCells(secondSelectedCell);

        var firstSelectedCell = $('.selected'),
            firstSelectedElement = firstSelectedCell.children();


        clearCells(firstSelectedCell);

        firstSelectedElement.appendTo(secondSelectedCell);
        secondSelectedElement.appendTo(firstSelectedCell);
    }

        // End - Movement of Player

    // End - Game next level


























// End - Game

});
