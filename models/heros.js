const db = require('./mongooseConnection').db;
const mongoose = require('mongoose');
const schema = require('./schema');

const HeroSchema = mongoose.model('HeroSchema', schema.Hero);


const getHeroStartingWith =(query)=>{
  return(new Promise(function(resolve, reject) {
    let newQuery = "^"+query;

    let queryObj = {
      $regex:newQuery,
      $options:"im"
    }
    HeroSchema.find({name:queryObj},function(err,res){
      (res) ? resolve(res) : reject(err)
    }).limit(4);
  }));
}

const getHero = (name) => {
  return new Promise(function(resolve, reject) {
    HeroSchema.findOne({name:name},function(err,res){
      (res) ? resolve(res) : reject(err)
    });
  });
}

const addNewHero = (body) => {
  return new Promise(function(resolve, reject) {
    getHero(body.name)
    .catch(() => {
      let newHero = new HeroSchema(body);
      console.log(newHero);
      newHero.save();
    })
  });
}

module.exports = {
  getHeroStartingWith:getHeroStartingWith,
  addNewHero:addNewHero
}
