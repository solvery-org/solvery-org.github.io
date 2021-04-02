var currentYear = new Date().getFullYear();
document.getElementById("changeDate").textContent = "\u00A9" + currentYear;

try {
    //not possible at main page, as discussion is not defined there
    updateDiscussion();
} catch (e) {}
