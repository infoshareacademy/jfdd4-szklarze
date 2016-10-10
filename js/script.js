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
        return cells.empty();
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
            'icon-steak',
            'icon-chicken',
            'icon-tomato'

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
        //TODO: find clusters and remove clusters needs to be added here
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
                clearInterval(timeCounter);
                enableStartButton();
            }
            // if (timeAmount == 0 || isMatchingElementLeft(true) == 0) {
            //     clearInterval(timeCounter);
            //     enableStartButton();
            // }
        }, 1000);
    }

// End - Game timer

// Start - Game

    function generateTable(size) {
        var $table = $('.game-table'),
            $tbody = $('<tbody>');

        $table
            .empty()
            .css('display', 'flex')
            .append($tbody);

        for (var rowCount = 1; rowCount <= size; rowCount++) {
            var $row = $('<tr>');

            $tbody.append($row);
            for (var cellCount = 1; cellCount <= size; cellCount++) {
                var $cell = $('<td>').removeClass()
                    .data('row', rowCount)
                    .data('col', cellCount)
                    .attr('data-row', rowCount)
                    .attr('data-col', cellCount);
                $row.append($cell);
            }
        }
    }

    // function createElementToFind() {
    //     var $elementToFind = $('.game-find-this-img');
    //     $elementToFind.find('img').remove();
    //     $elementToFind.append(createRandomElement());
    //     $elementToFind.find('.img-element').removeClass();
    //     $elementToFind.find('img').addClass('img-element-to-find');
    // }

    function clearPoints() {
        $('.points').text('0');
    }

    // function findElementOnClick() {
    //     var $elementToFind = $('.game-find-this-img').find('.img-element-to-find'),
    //         $imgElement = $('.img-element'),
    //         $elementToFindSrc = $elementToFind.attr('src'),
    //         points = 0;
    //
    //     $imgElement.click(function () {
    //         var $clickedElement = $(this);
    //
    //         if ($elementToFindSrc === $(this).attr('src')) {
    //             points++;
    //             $('.points').text(points);
    //             $clickedElement.css('background', '#888').fadeOut(300);
    //             setTimeout(function () {
    //                 $clickedElement.remove();
    //                 findEmptyCells();
    //             }, 300);
    //         }
    //         setTimeout(function () {
    //             isGameFinished();
    //         }, 300);
    //
    //     });
    // }

    function isTimeOut() {
        var $time = $('.game-timer').text();
        return $time == 'Czas: 00:00';
    }

    // function isMatchingElementLeft(getLeftElementsConut) {
    //     var $elementToFind = $('.game-find-this-img').find('.img-element-to-find'),
    //         $elementToFindSrc = $elementToFind.attr('src'),
    //         $elementsOnBoard = $('.game-table').find('.img-element').toArray(),
    //         matchingElementsCounter = 0;
    //
    //     $elementsOnBoard.forEach(function (elementOnBoard) {
    //         var $elementOnBoardSrc = $(elementOnBoard).attr('src');
    //         if ($elementOnBoardSrc == $elementToFindSrc) matchingElementsCounter++;
    //     });
    //
    //     if (getLeftElementsConut != undefined)
    //         return matchingElementsCounter;
    //     else
    //         return matchingElementsCounter > 0;
    // }

    function showSummary() {
        var pointsCount = $('.points').text();
        $('.game-summary').show();
        $('.game-table').hide();
        $('.game-panel').hide();
        $('.game-score').text(pointsCount);
    }

    // function takePointsForLeftElements() {
    //     var leftElements = isMatchingElementLeft(true),
    //         $pointsEarnead = $('.points'),
    //         points = Number($pointsEarnead.text()) - Number(leftElements);
    //
    //     if (points < 0) points = 0;
    //
    //     $pointsEarnead.text(points);
    // }

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

    (function startGame() {
        var $gameStartButton = $('.game-start-button');

        $gameStartButton.click(function () {
            $('.game-instructions').hide();
            startTimer(15);//Set time amount here, max 30 seconds.
            clearPoints();
            findClusters(3);
            // // createElementToFind();
            // clearCells();
            // findEmptyCells();
            // createRandomElement();
            // addCreatedRandomElementToEmptyCell();
            // findElementOnClick();
            selectCell();

        })
    })();

    function isGameFinished() {
        // if (!isMatchingElementLeft()) {
        //     addTimeBonus();
        //     showSummary();
        // }
        if (isTimeOut()) {
            // takePointsForLeftElements();
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


// End - Game

// Start - Gamer-click
    function selectCell() {
        var $cell = $('td');

        $cell.click(function () {
            var $numberOfSelectedCells = $('.selected').length;

            if ($numberOfSelectedCells == 0) {
                addClassToCell($(this));
            }
            else if ($numberOfSelectedCells == 1) {
                checkCellPosition($(this));
            }
        })
    }

    function addClassToCell(cell) {
        cell.addClass('selected');
    }

    function switchCellsContent(cell) {
        addClassToCell(cell);
        setTimeout(function () {
            switchElementsBetweenCells(cell);
            findClusters(3);
            findEmptyCells();
            addCreatedRandomElementToEmptyCell();
        }, 201);
    }

    function clearCell(cell) {
        cell.empty().removeClass('selected');
    }

    function incorrectMoveAlert(cell) {
        var alertMessage = 'Niedozwolony ruch!' + ' ' + "Możesz wybrać element sąsiadujący z wcześniej zaznaczonym.";

        cell.css('background-color', 'red');
        alert(alertMessage);
        setTimeout(function () {
            cell.removeAttr('style')
        }, 200);
    }

    function checkCellPosition(cell) {
        var firstSelectedCellRow = $('.selected').data('row'),
            firstSelectedCellColumn = $('.selected').data('col'),
            secondSelectedCellRow = cell.data('row'),
            secondSelectedCellColumn = cell.data('col');

        if ((secondSelectedCellColumn === firstSelectedCellColumn) && (Math.abs(firstSelectedCellRow - secondSelectedCellRow) == 1)) {
            switchCellsContent(cell);
        }
        else if ((secondSelectedCellRow === firstSelectedCellRow) && (Math.abs(firstSelectedCellColumn - secondSelectedCellColumn) == 1)) {
            switchCellsContent(cell);
        }
        else if ((secondSelectedCellColumn == firstSelectedCellColumn) && ( secondSelectedCellRow == firstSelectedCellRow)) {
            cell.removeClass('selected');
        }
        else {
            incorrectMoveAlert(cell);
        }
    }

    function switchElementsBetweenCells(cell) {

        var secondSelectedElement = cell.children(),
            secondSelectedCell = cell;

        clearCell(secondSelectedCell);

        var firstSelectedCell = $('.selected'),
            firstSelectedElement = firstSelectedCell.children();

        clearCell(firstSelectedCell);

        firstSelectedElement.appendTo(secondSelectedCell);
        secondSelectedElement.appendTo(firstSelectedCell);
    }

// End - Gamer-click


    // Start - Find clusters


        // function locateNextCell(cell, deltaRow, deltaCol) {
        //     var startCell = cell;
        //     return {
        //         row: startCell.data('row') + deltaRow,
        //         col: startCell.data('col') + deltaCol
        //     };
        // }

        function createElementObject(cell) {
            return {
                row: $(cell).data('row'),
                col: $(cell).data('col')
            }
        }

        function getElementsToCompare(direction, cell) {
            var target = createElementObject(cell),
                $elementsInLine = [];


            if (direction == 'right') {
                for (col = target.col+1; col <=10 ; col++) {
                    $elementsInLine.push($('td[data-row='+target.row+
                                            '][data-col='+col+']'));
                }
            }

            else if (direction == 'left') {
                for (col = target.col-1; col >= 1 ; col--) {
                    $elementsInLine.push($('td[data-row='+target.row+
                        '][data-col='+col+']'));
                }
            }

            else if (direction == 'up') {
                for (row = target.row-1; row >=1 ; row--) {
                    $elementsInLine.push($('td[data-row='+row+
                        '][data-col='+target.col+']'));
                }
            }

            else if (direction == 'down') {
                for (row = target.row+1; row <=10 ; row++) {
                    $elementsInLine.push($('td[data-row='+row+
                        '][data-col='+target.col+']'));
                }
            }

            else
                throw console.log('Specify direction: "right", "left", "up" or "down"');

            return $elementsInLine;
        }

        function areElementsSrcEqual(cell, elementToCompare) {
            var cellSrc = $(cell).find('.img-element').attr('src'),
                elementsSrc = elementToCompare.find('.img-element').attr('src');

            return cellSrc == elementsSrc;
        }

        function getMatchingElements(direction, cell) {
            var elementsNextToTarget = getElementsToCompare(direction, cell),
                comparingResults = [];

            elementsNextToTarget.every(function (element) {
                var srcComparison = areElementsSrcEqual(cell, element);

                if (srcComparison)
                    comparingResults.push([srcComparison, element]);

                return srcComparison;
            });
            return comparingResults;
        }

        function findClusters(clusterSize) {

            var $cell = $('td');

            $cell.each(function (index, element) {
                var right = getMatchingElements('right', element),
                    left = getMatchingElements('left', element),
                    up = getMatchingElements('up', element),
                    down = getMatchingElements('down', element);

                var sumCross = right.length + left.length + 1,
                    sumDown = up.length + down.length + 1;

                if (sumCross >= clusterSize) {
                    var leftSide = getElementsToRemove (left),
                        rightSide = getElementsToRemove (right);
                    removeElements (element, leftSide, rightSide);
                }
                if (sumDown >= clusterSize) {
                    var upSide = getElementsToRemove (up),
                        downSide = getElementsToRemove (down);
                    removeElements (element, upSide, downSide);
                }
            })
        }

        function removeElements(initElement, side1, side2) {
            side1.forEach(function (element) {
                element.find('img').remove();
            });
            side2.forEach(function (element) {
                element.find('img').remove();
            });
            initElement.find('img').remove();
            findEmptyCells();
            createRandomElement();
            addCreatedRandomElementToEmptyCell();
        }

        function getElementsToRemove(arrayHoldingElementsToRemove) {
            return arrayHoldingElementsToRemove.map(function (element) {
                return $(element[1]);
            })
        }

// End - Find clusters
});
