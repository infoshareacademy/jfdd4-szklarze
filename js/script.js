/**
 * Created by natvet on 14.09.16.
 */

<!-- Start - Nawigacja-->
function toggleMenu() {
    var navLinks = document.getElementById("nav-links");
    var navBtn = document.getElementById("nav-btn");
    var navDspl = getComputedStyle(navLinks, null).display;

    if (navDspl == "flex") {
        navLinks.style.display = "none";
        navBtn.style.backgroundImage = "url(../images/icon-white-menu.svg)"
    } else {
        navLinks.style.display = "flex";
        navBtn.style.backgroundImage = "url(../images/icon-white-janusz.svg)"
    }
}

(function() {
    document.getElementById("nav-btn").setAttribute("onclick", "toggleMenu()");
})();

<!-- End - Nawigacja-->
