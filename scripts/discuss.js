//list of all contributions matching current tags
var contributionShortList = {}; 

//family of contributions belonging to statement selected in statementOverview for display in contributionTree
var selectedTree = {};

//contribution selected in contributionTree for display in contributionDetail
var selectedContribution = {};

function addStatementToOverview(contribution) {
    if (contribution.type == "statement") {
        var contributionStatementBox = document.createElement("div");
        contributionStatementBox.id = "overview" + contribution.id;
        contributionStatementBox.no = contribution.id;

        //replace with real function!
        contributionStatementBox.addEventListener("click", updateTreeOnStatementSelect)

        contributionStatementBox.textContent = contribution.content;
        contributionStatementBox.classList.add("statement");
        contributionStatementBox.classList.add("contribution" + contribution.id);
        var statementOverview = document.getElementById("statementOverview");
        statementOverview.appendChild(contributionStatementBox);
    } 
}

function updateSelectedTree(contribution) {
    selectedTree[contribution.id] = contribution;
    if (!contribution.children) {
        return;
    } else {
        for (var childId of contribution.children) {
            updateSelectedTree(contributionShortList[childId]);
        }
    }
    
}

function updateTreeDOM(contribution, parentNode) {
    var contributionTreeBox = document.createElement("div");
    parentNode.appendChild(contributionTreeBox);
    contributionTreeBox.textContent = contribution.content;
    contributionTreeBox.classList.add("discussionTreeElement");
    if (contribution.type == "statement") {
        contributionTreeBox.classList.add("discussionTreeHead");
    } else {
        var contributionType = contribution.type ? "pro" : "con";
        contributionTreeBox.classList.add(contributionType);
    }
    if (!contribution.children) {
        return;
    } else {
        for (var childId of contribution.children) {
            //replace parentNode by contributionTreeBox
            updateTreeDOM(contributionShortList[childId], parentNode);
        }
    }
}

function updateTreeOnStatementSelect(event) {
    var id = event.target.no;
    var statement = contributionShortList[id];
    
    var contributionTree = document.getElementById("contributionTree");
    contributionTree.innerHTML = "";
    updateTreeDOM(statement, contributionTree);
    //selectedTree = {};
    //updateSelectedTree(statement);
    //console.log(selectedTree);
}

function findAllContributionsMatchingSingleTag(tag, contributionList) {
    var result = {};
    var contribution;
    for (var id in contributionList) {
        contribution = contributionList[id];
        if (contribution.tags.includes(tag)) {
            result[id] = contribution;
        }
    }
    return result
}

function findAllContributionsMatchingAllTags() {
    //returns object of all contributions matching all specified tags
    var result = databaseDummy; 
    var tag; 
    for (var tagIndex in searchTermList) {
        tag = searchTermList[tagIndex];
        result = findAllContributionsMatchingSingleTag(tag, result);
    }
    return result;
}

function updateContributionShortList() {
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
    var contribution;
    for (var id in visibleNew) {
        contribution = visibleNew[id];
        addStatementToOverview(contribution);
    }
}

function updateDiscussion() {
    updateDiscussionDOM();
    updateContributionShortList();
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