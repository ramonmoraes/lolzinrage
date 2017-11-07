'use strict'
const cjson = require('circular-json');
const fs = require('fs');
const heroDB = require("../models/heros");


class RiotChampionCopyApi {

  constructor(filename, path) {
    this.imgLoadingUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
    this.imgSquareUrl = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/"
    this.path = path || "./riotApi/";
    this.fileName= filename ||"championList.txt";
    this.matters="myChampionListThatMatters.txt"
    this.length = this.objectLength() || 0;
    this.json;
  }

  atualizarJson(file){
    this.atualizarArquivoBase(file)
    .then(() => {
      this.lerArquivoBase()
      .then((base) => {
        this.adicionarImgUrls(base)
        .then((baseComImgs) => {
          this.salvarArquivoMatters(baseComImgs);
        })
      })
    })
  }

  //CUIDADO
  atualizarArquivoBase (file) {
    return new Promise((resolve, reject)=> {
      console.log(file);
      fs.writeFile(this.path+this.fileName,cjson.stringify(file));
    });
  }

  lerArquivoBase() {
    return new Promise( (resolve, reject)=> {
      fs.readFile(this.path+this.fileName,'utf8', (err, res) => {
        resolve( ((err) ? err : res))
      });
    });
  }

  adicionarImgUrls () {
    return new Promise( (resolve, reject)=> {
      let newJson;
      this.lerArquivoBase()
      .then( (res) => {
        let championList = cjson.parse(res);
        newJson=championList;
        let count=0;
        for (let key in championList) {
          newJson[key].imgSquareUrl=this.imgSquareUrl+newJson[key].name+".png"
          newJson[key].imgLoadingUrl=this.imgLoadingUrl+newJson[key].name+"_0.jpg"
          count++;
          if(count==this.objectLength(championList)){
            resolve(newJson);
          }
        }
      });
    });
  }

  salvarArquivoMatters (arqv)  {
    fs.writeFile(this.path+this.matters,cjson.stringify(arqv),(err,res) => {
      console.log((err)? err : 'updated in : '+this.path+this.matters);
    });
  }

  getAllHeros () {
    return new Promise((resolve, reject)=> {
      fs.readFile(this.path+this.matters,'utf8', (err,res) => {
        resolve(cjson.parse(res))
      })
    });
  }

  salvarHeroesInMongo (){
    this.getAllHeros()
    .then((list) => {
      for (var key in list) {
        heroDB.addNewHero(list[key]);
      }
    })
  }
  objectLength ( object ) {
    let length = 0;
    for( let key in object ) {
      if( object.hasOwnProperty(key) ) {
        ++length;
      }
    }
    return length;
  }

  teste(){
    this.atualizarJson()
  }
}



module.exports = RiotChampionCopyApi;
