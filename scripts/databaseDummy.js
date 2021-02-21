var databaseDummy = [
    {
        id : 1,
        tags : ["climate", "co2", "fuel"],
        parent : null,
        children : [2, 3],
        type : "statement",
        content : "Diesel subsidies should be cancelled completely.",
        source : null,
        upvote: 10,
        downvote : 5,
    },
    {
        id : 2,
        tags : ["climate", "co2", "fuel"],
        parent : 1,
        children : null,
        type : true,
        content : "It is the subsidy which is the most harmful.",
        source : "randomlink.com",
        upvote: 5,
        downvote : 1
    },
    {
        id : 3,
        tags : ["climate", "co2", "fuel"],
        parent : 1,
        children : null,
        type : false,
        content : "There is no alternative for transport companies yet.",
        source : "anotherrandomlink.com",
        upvote: 2,
        downvote : 3
    },
    {
        id : 4,
        tags : ["social"],
        parent : null,
        children : [5],
        type : "statement",
        content : "Inheritance tax should be increased.",
        source : null,
        upvote: 7,
        downvote : 6,
    },
    {
        id : 5,
        tags : ["social"],
        parent : 1,
        children : [6],
        type : true,
        content : "This will reduce wealth inequality.",
        source : "randomlink.com",
        upvote: 5,
        downvote : 4
    },
    {
        id : 6,
        tags : ["social"],
        parent : 1,
        children : null,
        type : false,
        content : "Wealth inequality will not be affected by this.",
        source : "anotherrandomlink.com",
        upvote: 5,
        downvote : 7
    }
]