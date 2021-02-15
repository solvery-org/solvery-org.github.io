var searchTermList = sessionStorage.getItem("searchTermList");
searchTermList = searchTermList ? JSON.parse(searchTermList) : {};

function addSearchTermToDOMOnInput(event) {
    var searchTerm = event.target[0].value;
    var index = addSearchTermToList(searchTerm);
    addSearchTermToDOM(searchTerm, index);
    /*remove following lines as soon as working with HTTP-Requests*/
    event.target.reset();
    event.preventDefault();
}

function addSearchTermToDOM(searchTerm, index) {
    var searchTermBox = document.createElement("div");
    searchTermBox.id = "searchTerm" + index;
    searchTermBox.textContent = searchTerm;
    searchTermBox.classList.add("searchTerm");
    var removeButton = document.createElement("button");
    removeButton.no = index;
    removeButton.innerHTML = "X";
    removeButton.title = "Remove Term";
    removeButton.addEventListener("click", removeSearchTermFromList);
    removeButton.addEventListener("click", removeSearchTermFromDOM);
    searchTermBox.appendChild(removeButton);
    var container = document.getElementById("searchTermContainer");
    container.appendChild(searchTermBox);
}

function removeSearchTermFromDOM(event) {
    var index = event.target.no;
    document.getElementById("searchTerm" + index).remove();
}

function addSearchTermToList(searchTerm) {
    var index = 0;
    while (searchTermList[index] != undefined) {
        index ++;
    }
    searchTermList[index] = searchTerm;
    var searchTermListString = JSON.stringify(searchTermList);
    sessionStorage.setItem("searchTermList", searchTermListString);
    return index;
}

function removeSearchTermFromList(event) {
    var index = event.target.no;
    delete searchTermList[index];
    var searchTermListString = JSON.stringify(searchTermList);
    sessionStorage.setItem("searchTermList", searchTermListString);
}

function addSearchFormListener() {
    var searchForm = document.getElementById("topicSearch");
    searchForm.addEventListener("submit", addSearchTermToDOMOnInput);
}

function reloadSearchTermListToDom() {
    for (var termId in searchTermList) {
        addSearchTermToDOM(searchTermList[termId], termId);
    }
}

addSearchFormListener();
reloadSearchTermListToDom();