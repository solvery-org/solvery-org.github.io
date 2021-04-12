module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    topicId: {
      type: Sequelize.BIGINT
    },
    tags: {
      type: Sequelize.BIGINT
    },
    parent: {
      type: Sequelize.BIGINT
    },
    type: { //not sure what rouven meant by this
      type: Sequelize.BIGINT
    },
    content: {
      type: Sequelize.STRING
    },
    metadata: {
      type: Sequelize.BIGINT
    },
    source: {
      type: Sequelize.BIGINT
    },
    upvote: {
      type: Sequelize.BIGINT
    },
    downvote: {
      type: Sequelize.BIGINT
    },
    archived: {
      type: Sequelize.BOOLEAN
    },
    notShow: {
      type: Sequelize.BOOLEAN
    }
  });

  return Post;
};
