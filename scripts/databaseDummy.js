var databaseDummy = {
    1 : {
        id : 1,
        topicId: 1,
        tags : ["climate", "co2", "fuel"],
        parent : null,
        children : [2, 3],
        type : "statement",
        content : "Diesel subsidies should be cancelled completely.",
        source : null,
        upvote: 10,
        downvote : 5,
        archived: false,
        notToShow: false,
    },
    2 : {
        id : 2,
        topicId: 1,
        tags : ["climate", "co2", "fuel"],
        parent : 1,
        children : null,
        type : true,
        content : "It is the subsidy which is the most harmful.",
        source : "randomlink.com",
        upvote: 5,
        downvote : 1
    },
    3 : {
        id : 3,
        topicId: 1,
        tags : ["climate", "co2", "fuel"],
        parent : 1,
        children : null,
        type : false,
        content : "There is no alternative for transport companies yet.",
        source : "anotherrandomlink.com",
        upvote: 2,
        downvote : 3
    },
    4 : {
        id : 4,
        topicId: 2,
        tags : ["social"],
        parent : null,
        children : [5],
        type : "statement",
        content : "Inheritance tax should be increased.",
        source : null,
        upvote: 7,
        downvote : 6,
    },
    5 : {
        id : 5,
        topicId: 2,
        tags : ["social"],
        parent : 1,
        children : [6],
        type : true,
        content : "This will reduce wealth inequality.",
        source : "randomlink.com",
        upvote: 5,
        downvote : 4
    },
    6 : {
        id : 6,
        topicId: 2,
        tags : ["social"],
        parent : 1,
        children : null,
        type : false,
        content : "Wealth inequality will not be affected by this.",
        source : "anotherrandomlink.com",
        upvote: 5,
        downvote : 7
    },
    7 : {
        id : 7,
        topicId: 3,
        tags : ["social"],
        parent : null,
        children : [8],
        type : "statement",
        content : "Companies should have to guarantee for fair production conditions.",
        source : null,
        upvote: 7,
        downvote : 6,
    },
    8 : {
        id : 8,
        topicId: 3,
        tags : ["social"],
        parent : 7,
        children : [9,10],
        type : true,
        content : "This will lead to an improvement on living conditions in producing countries.",
        source : "randomlink.com",
        upvote: 5,
        downvote : 4
    },
    9 : {
        id : 9,
        topicId: 3,
        tags : ["social"],
        parent : 8,
        children : null,
        type : false,
        content : "The necessary step is to be done by the government of the respective country.",
        source : "anotherrandomlink.com",
        upvote: 5,
        downvote : 7
    },
    10 : {
        id : 10,
        topicId: 3,
        tags : ["social"],
        parent : 8,
        children : null,
        type : true,
        content : "This has been observed for several countries.",
        source : "anotherrandomlink.com",
        upvote: 12,
        downvote : 0
    }
}