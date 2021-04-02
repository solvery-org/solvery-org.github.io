//list of all contributions matching current search tags
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
    // updates the selectedTree-Object containing all contributions
    // of the current argument tree
    //
    // WILL BE MOVED TO BACKEND!
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
    //Creates the contribution tree

    //treeContainer: container for the element placeholder and branches
    var treeContainer = document.createElement("div");
    treeContainer.classList.add("treeContainer");
    parentNode.appendChild(treeContainer);
    //treeElement: element placeholder
    var treeElement = document.createElement("div"); 
    treeContainer.appendChild(treeElement);
    treeElement.classList.add("treeElement");
    //treeElTooltip: displays on hovering over the treeElement
    var treeElTooltip = document.createElement("span"); 
    treeElTooltip.setAttribute("role", "tooltip");
    treeElTooltip.textContent = contribution.content;
    treeElement.appendChild(treeElTooltip);
    //verticalBranch: vertical line (no content)
    var verticalBranch = document.createElement("div");
    verticalBranch.classList.add("verticalBranch");
    if (contribution.type == "statement") {
        treeElement.classList.add("treeHead");
        treeContainer.appendChild(verticalBranch);
    } else {
        treeContainer.insertBefore(verticalBranch, treeElement);
        var contributionType = contribution.type ? "pro" : "con";
        treeElement.classList.add(contributionType);
    }

    if (!contribution.children) {
        return;
    } else {
        //treeBranchBox: container for all child elements
        //subdivided into container for pro-arguments and con-arguments
        //both (pro-and con-box) are added as placeholders
        treeContainer.appendChild(verticalBranch.cloneNode());
        var treeBranchBox = document.createElement("div"); 
        treeContainer.appendChild(treeBranchBox);
        treeBranchBox.classList.add("treeBranchBox");
        var treeProBox = document.createElement("div");
        treeBranchBox.appendChild(treeProBox);
        var treeConBox = document.createElement("div"); 
        treeBranchBox.appendChild(treeConBox);
        var newParentNode;
        var childContribution;
        for (var childId of contribution.children) {
            childContribution = contributionShortList[childId];
            if (childContribution.type) {
                treeProBox.classList.add("treeArgBox"); 
                newParentNode = treeProBox;
            } else {
                treeConBox.classList.add("treeArgBox");
                newParentNode = treeConBox;
            }
            updateTreeDOM(childContribution, newParentNode);
        }
    }
}

function updateTreeOnStatementSelect(event) {
    var id = event.target.no;
    var statement = contributionShortList[id];
    
    var contributionTree = document.getElementById("contributionTree");
    contributionTree.classList.add("aTreeWasSelected");
    contributionTree.innerHTML = "";
    updateTreeDOM(statement, contributionTree);
    //selectedTree = {};
    //updateSelectedTree(statement);
    //console.log(selectedTree);
}

function updateContributionOnTreeContributionSelect(event) {
    var id = event.target.no;
    var statement = contributionShortList[id];
    
    var contributionTree = document.getElementById("contributionTree");
    contributionTree.classList.add("aTreeWasSelected");
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