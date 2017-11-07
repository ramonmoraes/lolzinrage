var db = require('./mongooseConnection').db;
var mongoose = require('mongoose');
var schema = require('./schema');
var UserSchema = mongoose.model('UserSchema', schema.User);
var bcrypt = require("./bcrypt");

const createUser = (body) => {
  return ( new Promise(function(resolve, reject) {

    var newUser = new UserSchema(body);
    searchUserEmail(body.email).then( (emails) => {
      if(emails.length!=0){
        resolve("Este e-mail ja esta em uso.");
      }else {
        bcrypt.cryptString(body.password).then( (newPassword) => {
          newUser.password=newPassword;
          newUser.save( (err, done) => {
            // (err) ? reject(err) : resolve(done)
            (err) ? reject("Algum erro ocorreu :(") : resolve("Conta criada com sucesso!");
          });
        });
      }
    })

  }));
}

const getUser = (id) => {
  return ( new Promise(function(resolve, reject) {

    UserSchema.findById(id, (err,res) => {
      resolve(res);
    })

  }) );
}

const updateUser = (body) => {
  return new Promise(function(resolve, reject) {
    UserSchema.findByIdAndUpdate(body._id ,{$set:body}, (err,res) => {
      resolve(res);
    })
  });
}

const loginUser = (body) => {
  return ( new Promise(function(resolve, reject) {

    searchUserEmail(body.email).then( (user) => {
      if(!user){
        reject('Usuario não encontrado')
      }else{
        bcrypt.unCrypt(body.password,user[0].password).then( (rightPassword) => {
          (rightPassword) ? resolve(user[0]) : resolve(false);
        })
      }
    });

  }) );
}

const searchUserEmail = (email) => {
  return( new Promise(function(resolve, reject) {

    UserSchema.find({email:email}, (err,usuario)=>{
      resolve(usuario);
    });

  }) );
}


module.exports ={
  createUser:createUser,
  updateUser:updateUser,
  loginUser:loginUser,
  getUser:getUser
}
