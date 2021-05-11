//list of all contributions matching current search tags
var contributionShortList = {}; 

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

function updateTreeDOM(contribution, parentNode) {
    // Creates the contribution tree recursively
    // Child nodes of the tree are trees themselves
    //
    // treeContainer: container for the element placeholder and branches
    var treeContainer = document.createElement("div");
    treeContainer.classList.add("treeContainer");
    parentNode.appendChild(treeContainer);
    // treeElement: element placeholder
    var treeElement = document.createElement("div"); 
    treeElement.no = contribution.id;
    treeElement.addEventListener("click", updateContributionOnTreeContributionSelect)
    treeContainer.appendChild(treeElement);
    treeElement.classList.add("treeElement");
    // treeElTooltip: displays on hovering over the treeElement
    var treeElTooltip = document.createElement("span"); 
    treeElTooltip.setAttribute("role", "tooltip");
    treeElTooltip.no = treeElement.no;
    treeElTooltip.textContent = contribution.content;
    treeElement.appendChild(treeElTooltip);
    // verticalBranch: vertical line (no content)
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
        // treeBranchBox: 
        //  - container for all child elements
        //  - subdivided into container for pro-arguments and con-arguments
        //  - both (pro-and con-box) are added as placeholders
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
            // first argument of each type adds top horizontal branch 
            // to respective placeholder box 
            // newParentNode sorts contribution into right placeholder
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
    // displays the argument tree to a specific statement
    var id = event.target.no;
    var statement = contributionShortList[id];
    var contributionTree = document.getElementById("contributionTree");
    contributionTree.classList.add("aTreeWasSelected");
    contributionTree.innerHTML = "";
    updateTreeDOM(statement, contributionTree);
    hideDetailDOM();
}

function hideDetailDOM() {
    var contributionDetail = document.getElementById("contributionDetail");
    contributionDetail.classList.add("hidden");
}

function updateDetailDOM(contribution) {
    // displays the contribution
    // consists of votecount, content and sources
    var contributionDetail = document.getElementById("contributionDetail");
    contributionDetail.classList.remove("hidden");
    // voteCountDisplay: shows current voteCount on selected contribution
    // voteCountSign: distinguishes (UI reasons) between pos. and neg. counts
    var voteCountDisplay = contributionDetail.getElementsByClassName("voteCountDisplay")[0];
    var voteCount = contribution.upvote - contribution.downvote;
    var voteCountSign = (voteCount <= 0) ? "negative" : "positive";
    voteCountDisplay.classList.remove("negative", "positive");
    voteCountDisplay.classList.add(voteCountSign);
    voteCountDisplay.innerHTML = voteCount;
    // contributionTextDisplay: contains the text content of the contribution
    var contributionTextDisplay = contributionDetail.getElementsByClassName("contributionTextDisplay")[0];
    contributionTextDisplay.innerHTML = contribution.content;
    // contributionLinkList: contains superscript-links to all sources
    if (contribution.sources) {
        for (var sourceKey in contribution.sources) {
            // creates anchor elements for each source provided in contribution
            sourceLink = document.createElement("a");
            sourceLink.href = "https://" + contribution.sources[sourceKey];
            sourceLink.target = "_blank";
            sourceLink.rel = "noopener noreferrer";
            sourceLink.classList.add("sourceLink");
            // links are to be displayed in superscript, counting from 1
            var sourceDisplay = document.createElement("sup");
            sourceKey++;
            sourceDisplay.innerHTML = "[" + sourceKey + "]";
            sourceLink.appendChild(sourceDisplay);
            contributionTextDisplay.appendChild(sourceLink);
        }
    }
}

function updateContributionOnTreeContributionSelect(event) {
    // displays the contribution which has been selected in the tree
    var id = event.target.no;
    var contribution = contributionShortList[id];
    updateDetailDOM(contribution);
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
    //document.getElementById("contributionDetail").innerHTML = "";
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
//contribution selected in contributionTree for display in contributionDetail
var selectedContribution = {};

//family of contributions belonging to statement selected in statementOverview for display in contributionTree
var selectedTree = {};

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
*/

// document.getElementById("test").addEventListener("click", updateDiscussion);