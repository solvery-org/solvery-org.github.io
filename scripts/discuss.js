//list of all contributions matching current tags
var contributionShortList = []; 

//family of contributions belonging to statement selected in statementOverview for display in contributionTree
var selectedContributionTree = {};

//contribution selected in contributionTree for display in contributionDetail
var selectedContribution = {};

function addStatementToOverview(contribution) {
    if (contribution.type == "statement") {
        var contributionStatementBox = document.createElement("div");
        contributionStatementBox.id = "overview" + contribution.id;

        //replace with real function!
        contributionStatementBox.addEventListener("click", testClick)

        contributionStatementBox.textContent = contribution.content;
        contributionStatementBox.classList.add("statement");
        contributionStatementBox.classList.add("contribution" + contribution.id);
        var statementOverview = document.getElementById("statementOverview");
        statementOverview.appendChild(contributionStatementBox);
    } 
}

function addContributionToContributionTree(contribution, parentNode) {
    var contributionTreeBox = document.createElement("div");
    if (contribution.type == "statement") {
        contributionTreeBox.classList.add("discussionTreeHead");
    } else {
        var contributionType = contribution.type ? "pro" : "con";
        contributionTreeBox.classList.add(contributionType);
    }
    //to-do
    parentNode.appendChild(contributionTreeBox);
}

function fillContributionTree() {
    //to-do
    var contributionTree = document.getElementById("contributionTree");
    contributionTree.appendChild(contributionTreeBox);
}

function testClick(event) {
    console.log("clicked: ", event.target.textContent)
}

function findAllContributionsMatchingSingleTag(tag, contributionList) {
    var result = [];
    for (var contribution of contributionList) {
        if (contribution.tags.includes(tag)) {
            result.push(contribution)
        }
    }
    return result
}

function findAllContributionsMatchingAllTags() {
    //returns list of all contributions matching all specified tags
    var result = databaseDummy;
    var tag; 
    for (var tagIndex in searchTermList) {
        tag = searchTermList[tagIndex];
        result = findAllContributionsMatchingSingleTag(tag, result);
    }
    return result;
}

function updateDiscussionShortlist() {
    contributionShortList = findAllContributionsMatchingAllTags();
}

function clearDiscussionDOM() {
    document.getElementById("statementOverview").innerHTML = "";
    document.getElementById("contributionTree").innerHTML = "";
    document.getElementById("contributionDetail").innerHTML = "";
}

function updateDiscussionDOM() {
    clearDiscussionDOM();
    var visibleNew = findAllContributionsMatchingAllTags();
    for (var contribution of visibleNew) {
        addStatementToOverview(contribution);
    }
}

function updateDiscussion() {
    updateDiscussionDOM();
    updateDiscussionShortlist();
}

/*

function removeContributionFromDom(id) {
    var domElementsToRemove = document.getElementsByClassName("contribution" + id);
    for (var el of domElementsToRemove) {
        el.remove();
    }
}

function addContributionToShortList(contribution) {
    contributionShortList[contribution.id] = contribution;
}

function findContributionToTags() {
    var contribution;
    var isContributionToAdd; 
    for (var contribution of databaseDummy) {
        for (var tagIndex in searchTermList) {
            isContributionToAdd = (contribution.tags.includes(searchTermList[tagIndex]) && contributionShortList[contribution.id] == undefined);
            if (isContributionToAdd) {
                addContributionToShortList(contribution);
                addStatementToOverview(contribution);
                console.log(contributionShortList);
            }
        }
    }
}
*/

// document.getElementById("test").addEventListener("click", updateDiscussion);