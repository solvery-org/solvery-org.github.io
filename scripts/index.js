function switchSideMenuVisibility() {
    var classList = document.getElementById("side-nav").classList;
    var mainDiv = document.getElementById("main");
    if (classList.toggle("sn-closed")) {
        mainDiv.style.marginLeft = "0";
    } else {
        mainDiv.style.marginLeft = "30vw";
    }
    classList.toggle("sn-open");
}

function addSideMenuButtonListener() {
    var buttonList = document.getElementsByClassName("snVisSwitch");
    for (var button of buttonList) {
        button.addEventListener("click", switchSideMenuVisibility);
    }
}

addSideMenuButtonListener();


