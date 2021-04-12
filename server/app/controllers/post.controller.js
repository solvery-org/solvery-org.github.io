const db = require("../models");
const Post = db.post;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  //Validate response
  if (!req.body.content){
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // TODO more checks to make sure the post is Valid
  // TODO automatically make some of these IDs
  // Create the Post
  const post = {
    topicID: req.body.topicId,      //This should come from some point in the front end?
    tags: req.body.tags,            //This should come after we have made a request to the tags table
    parent: req.body.parent,        //this should be recieved from the frontend?
    type: req.body.type,            //Not sure what this field is
    content: req.body.content,      //Get this from the user input
    metadata: req.body.metadata,    //This should come after we have made a request to the metadata table
    source: req.body.source,        //This should come after we have made a request to the sources table
    upvote: 0,                      //Set this to 0 by default
    downvoate: 0,                   //Set this to 0 by default
    archived: false,                //Default false
    notShow: false,                 //Default false
  };

  // Save Tutorial in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data=>{
      res.send(data);
    })
    .catch(err=>{
      res.status(500).send({
        message: "Error retrieving Post with id ="+id
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body,{
    where:{ id: id }
  })
    .then(num=>{
      if(num == 1){
        res.send({
          message: "Tutorial was updated sucessfully "
        });
      } else{
        res.send({
          message: "Cannot update Post with id =${id}. Maybe post was not found or req.body is empty"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id="+id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Post were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
};
