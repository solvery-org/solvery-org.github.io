function toggleTopMenu() {
    var navLinkSpan = document.getElementById("navTopLinks");
    var navLinkNumber = navLinkSpan.querySelectorAll("a").length;
    var navDiv = document.getElementById("navTop");
    var classList = navLinkSpan.classList;
    var menuHeight = navLinkNumber * 40 + 65;
    if (classList.toggle("navTopLinksAbove")) {
        navDiv.style.height = "var(--navTopHeight)";
    } else {
        navDiv.style.height = menuHeight + "px";
    }
    classList.toggle("navTopLinksBelow");
}

function addMenuButtonListener() {
    var button = document.getElementById("navMenuButton");
    button.addEventListener("click", toggleTopMenu);
}

addMenuButtonListener();