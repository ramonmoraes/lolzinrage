const db = require('./mongooseConnection').db;
const mongoose = require('mongoose');
const schema = require('./schema');
const PostSchema = mongoose.model('PostSchema', schema.Post);

const getPostAbout = (name) => {
  return new Promise((resolve, reject) => {
    PostSchema.find({name:name},(err,res) => {
      (res) ? resolve(res) : reject(err)
    })
  });
}

const createPost = (post) => {
  return new Promise(function(resolve, reject) {
    newPost = new PostSchema(post);
    newPost.save();
  });
}

const deletePost = () => {

}

const updatePost = () => {

}
