function toggleTopMenu() {
    var navLinkSpan = document.getElementById("navLinks");
    var navLinkNumber = navLinkSpan.querySelectorAll("a").length;
    var navDiv = document.getElementById("nav");
    var classList = navLinkSpan.classList;
    var menuHeight = navLinkNumber * 40 + 65;
    if (classList.toggle("navLinksTop")) {
        navDiv.style.height = "6vh";
    } else {
        navDiv.style.height = menuHeight + "px";
    }
    classList.toggle("navLinksBelow");
}

function addMenuButtonListener() {
    var button = document.getElementById("navMenuButton");
    button.addEventListener("click", toggleTopMenu);
}

addMenuButtonListener();