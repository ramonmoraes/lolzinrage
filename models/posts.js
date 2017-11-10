const db = require('./mongooseConnection').db;
const mongoose = require('mongoose');
const schema = require('./schema');
const PostSchema = mongoose.model('PostSchema', schema.Post);

const getPostAbout = (heroName) => {
  return new Promise((resolve, reject) => {
    PostSchema.find({heroName:heroName},(err,res) => {
      (res) ? resolve(res) : reject(err)
    })
  });
}

const createPost = (heroName , post) => {
  return new Promise(function(resolve, reject) {
    newPost = new PostSchema(post);
    newPost.heroName=heroName;
    newPost.save();
    resolve(newPost)
  });
}

const deletePost = () => {

}

const updatePost = () => {

}

module.exports ={
  createPost : createPost,
  getPostAbout:getPostAbout
}
