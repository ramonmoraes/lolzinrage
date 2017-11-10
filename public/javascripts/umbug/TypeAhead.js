'use strict'

class TypeAhead {

  constructor (input, funct, url) {
    this.input = input;
    this.funct = funct;
    this.url = url || '/getHeroName/';
    this.input.addEventListener("input",(ev) => {
      this.searchBeginBy()
      .then((list) => {
        this.createOptions(list);
        this.funct(input.value);
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

  createOptions(list) {
    let template = document.getElementById('heroOption');
    let heroList = document.getElementById('herolist');
    let clone = template.content.cloneNode(true);
    let datalist=clone.querySelector("datalist");

    for (var i = 0; i < list.length; i++) {
      let option = clone.querySelector("datalist option");
      clone = template.content.cloneNode(true);
      option.value=list[i].name;
      option.innerHTML=list[i].title;
      datalist.appendChild(option);
    }

    this.renderOptions(datalist, heroList);
  }

  renderOptions(datalist, heroList) {
    if(heroList.children.length===0) {
      heroList.appendChild(datalist.cloneNode(true))
    }else {
      heroList.replaceChild(datalist.cloneNode(true),heroList.childNodes[1])
    }
  }
}
