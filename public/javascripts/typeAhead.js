'use strict'

class TypeAhead {

  constructor (input,func) {
    this.input = input;
    this.url = '/getHeroName/';
    this.input.addEventListener("keyup",(ev) => {
      this.searchBeginBy()
      .then((list) => {
        func(list)
      })
    })
  }

  searchBeginBy () {
    return new Promise((resolve, reject)=> {
      if(this.input.value.length>=1){
        fetch(this.url+this.input.value,{method:"GET"})
        .then( (res) => {
          res.json()
          .then((heroList) => {
            resolve(heroList)
          })
        })
      }
    });
  }

}
