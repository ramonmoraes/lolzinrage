var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  password: String,
  email:   String,
  img:{ type: String, default: '/anonimous.png' },
  date: { type: Date, default: Date.now },
  active: Boolean,
  fame: Number,
});


var heroSchema = new Schema({
  name: String,
  title:String,
  imgSquareUrl:String,
  imgLoadingUrl:String,
});

var postSchema = new Schema({
  heroID:String, //
  text:String,
  user:String,
  likes:Number
});

module.exports = {
  Post:postSchema,
  Hero:heroSchema,
  User:userSchema
}
