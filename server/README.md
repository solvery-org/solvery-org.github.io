# README
Elizabeth Robertson 05/04/2021
Last update: 05/04/2021  by erlizzard
##Overview
We are making a CRUD API (CREATE, READ, UPDATE, DELETE)

CRUD -> REST
CREATE -> POST
READ -> GET
UPDATE -> PUT
DELETE -> DELETE

##Database
The database is currently being hosted by elephantsql under my credentials.

We are modelling a tree structure model of communication
We need
As attributes we have:
id -> unique idenifier of the post ----key
topicId -> Which topic does the post belong to?
tags -> get tag list
parent -> the id of the parent post
type -> The type of post? [What form can these types take?]
content ->  the static text of the post
metadata-> ID of the entry on the metadata table.
source -> [Linked sources]
upvote -> number of upvotes (float)
downvote -> number of downvotes
archived -> flag telling us if this post has been archived - so no more people can comment
notShow -> used to determine the visibility of the posts

We need tables for :
TagList - > id, Tag0 ,Tag1, Tag2, Tag3, Tag4, Tag5, Tag6, Tag7, ... Tag19
SourceList -> id, source0, source1, source2, source3, soure4, ... source 19
Posts -> all ids above
Topics -> TOPIC_id, NAME, PARENTID
Metadata -> meta_id Date, time, user, location,

Later maybe split it up also to have content seperately, now leave it as it is.
Content -> type, content, metadata

###Functionality  
We need to be able to:
Create a post/topic
Read a post/topic
Update a post/topic
Delete a post/topic

create metadata - without user
read metadata

create TagList -after user input
create SourceList - after user input

##Serialize
Serialize works a little bit differently - we don't have to write these CRUD commands explicitly - they are
already provided when we create a Sequelize Model.

We define the keys we want to have in there and sequlize will automatically populate some columns - id, createdAt, updatedAt - any others we need to specify explicitly

Then we need to define a controller -> which returns all methods which can be done with that Model

then we need to define router -> When we get a http request from the client - we need to know how the sever is going to respond by setting up routes connecting REST to Sequelize

https://bezkoder.com/node-js-express-sequelize-mysql/

###TODO
Set up router
Finish controller code for post model.
Setup:
Taglist, SourceList, Topics, Metadata models
Have the metdata, taglist, SourceList models autofilling the create function of post.controller.js
