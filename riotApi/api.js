const RiotChampionCopyApi = require('./RiotChampionCopyApi');
const axios = require('axios');
const db = require("../models/heros")
const baseUrl = "https://br1.api.riotgames.com";

let riot = new RiotChampionCopyApi('championList.txt');

// riot.salvarHeroesInMongo()

const getHerosInfo = (key) => {
  return  new Promise((resolve, reject) => {
    let apiKey = "?api_key="+key;
    let url = '/lol/static-data/v3/champions'
    axios.get(baseUrl+url+apiKey)
    .then( (newFile) => {
      resolve(newFile);
    })
    .catch( (err) => {
      console.log("error : "+ err.response.statusText);
    });
  });
}

const atualizarText = (key) => {
  getHerosInfo(key)
  .then((res) => {
    riot.atualizarJson(res);
  });
}

const getHeroAllMatters = () => {
  return new Promise((resolve, reject)=> {
    riot.getAllHeros()
    .then((res) => {
      resolve(res)
    })
  });
}

const getHeroStartingWith = (startWith) => {
  return new Promise(function(resolve, reject) {
    db.getHeroStartingWith(startWith)
    .then((res) => {
      resolve(res)
    })
  });
}
const getHero = (name) => {
return new Promise(function(resolve, reject) {
  db.getHero(name)
  .then((res) => {
    resolve(res)
  })
});
}
module.exports = {
  atualizarText : atualizarText,
  getHeroAllMatters : getHeroAllMatters,
  getHeroStartingWith : getHeroStartingWith,
  getHero:getHero
}
