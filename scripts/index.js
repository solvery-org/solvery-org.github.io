var currentYear = new Date().getFullYear();
document.getElementById("changeDate").textContent = "\u00A9" + currentYear;

try {
    //not possible at main page, as discussion is not defined there
    updateDiscussion();
} catch (e) {}

/*
fetch("http://txj09bh9vwcmw19w.myfritz.net:9876", {
    method: "POST",
    body : JSON.stringify({"Test" : "Testmessage"})
}).then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.text();
    }).then(response => {
        console.log("Testnachricht ", JSON.parse(response));
    }).catch (e => {
    console.warn(e.message)
});
*/