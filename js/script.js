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


// End - mix-buton
});