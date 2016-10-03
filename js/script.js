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

// Start - mix-button

function makeEmptyCell() {
    var cell = $('td');
    var clearCell = cell.empty();
    return clearCell
}

function findEmptyCell() {
    var emptyCell = $('td:empty').addClass('empty-cell');
    return emptyCell;
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
    var createElement = function (src) {
        img = new Image();
        img.src = "images/game-icons/" + elements[randomNumber] + ".svg";
        return img
    };
    return createElement();
}
function addRandomElementToEmptyCell() {
   var emptyCell = [ findEmptyCell()];
    var addElement = emptyCell.forEach(function(cell){
        return cell.append(createRandomElement());
    })
   };
    // var add = $emptyCell.prepend("test");
    // return add;



$('.game-mix-button').click(function () {
    makeEmptyCell();
    findEmptyCell();
    createRandomElement();
    addRandomElementToEmptyCell();
});


// End - mix-buton