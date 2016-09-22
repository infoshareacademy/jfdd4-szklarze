/**
 * Created by natvet on 14.09.16.
 */

<!-- Start - Nawigacja-->
function toggleMenu() {
    var navLinks = document.getElementById("nav-links");
    var navDspl = getComputedStyle(navLinks, null).display;
    if (navDspl == "flex") {navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}

// (function() {
//     document.getElementById("nav-unfold-btn").setAttribute("onclick", "toggleMenu()");
// })();

<!-- End - Nawigacja-->
