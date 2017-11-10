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
    this.matters="myChampionListThatMatters.txt";
    this.length = this.objectLength() || 0;
    this.json;
  }

  atualizarBancoDeDados(file){
    this.atualizarArquivoBase(file)
    .then(() => {
      this.lerArquivoBase()
      .then((arquivoBase) => {
        this.adicionarImgUrls(arquivoBase)
        .then((arquivoBaseComImgs) => {
          this.salvarArquivoMatters(arquivoBaseComImgs)
          .then((arquivoMatters) => {
            this.salvarHeroesInMongo(arquivoMatters)
          })
        })
      })
    })
  }

  //CUIDADO
  atualizarArquivoBase (file) {
    return new Promise((resolve, reject)=> {
      fs.writeFile(this.path+this.fileName,cjson.stringify(file),(err) => {
        (err) ? console.log(err) : resolve (true);
      });
    });
  }

  lerArquivoBase() {
    return new Promise( (resolve, reject)=> {
      fs.readFile(this.path+this.fileName,'utf8', (err, res) => {
        resolve( ((err) ? err : res))
      });
    });
  }

  adicionarImgUrls (arquivoString) {
    return new Promise( (resolve, reject)=> {
      let newJson;
      let championList = cjson.parse(arquivoString);
      newJson=championList.data.data;
      let count=0;
      for (let key in newJson) {
        let name = newJson[key].name;
        name = name.split(" ").join("");
        name = name.split("'").join("");
        newJson[key].imgSquareUrl=this.imgSquareUrl+name+".png"
        newJson[key].imgLoadingUrl=this.imgLoadingUrl+name+"_0.jpg"
        count++;
        if(count==this.objectLength(championList)){
          resolve(newJson);
        }

      }
    });
  }

  salvarArquivoMatters (arqv)  {
    return new Promise((resolve, reject)=> {
      fs.writeFile(this.path+this.matters,cjson.stringify(arqv),(err,res) => {
        console.log((err)? err : 'updated in : '+this.path+this.matters);
        resolve(arqv);
      });
    });
  }

  getAllHeros () {
    return new Promise((resolve, reject)=> {
      fs.readFile(this.path+this.matters,'utf8', (err,res) => {
        resolve(cjson.parse(res))
      })
    });
  }

  salvarHeroesInMongo (listOfHeros){
      for (var key in listOfHeros) {
        heroDB.addNewHero(listOfHeros[key]);
      }
  }
  
  atualizarBancoBaseadoNoMatters(){
    return new Promise((resolve, reject)=> {
      this.lerArquivoBase()
      .then((arquivoBase) => {
        this.adicionarImgUrls(arquivoBase)
        .then((arquivoBaseComImgs) => {
          this.salvarArquivoMatters(arquivoBaseComImgs)
          .then((arquivoMatters) => {
            this.salvarHeroesInMongo(arquivoMatters)
          })
        })
      })
    });
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

}

module.exports = RiotChampionCopyApi;
