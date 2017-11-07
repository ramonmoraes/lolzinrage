'use strict'

class HeroCard {

  constructor(info,place){
    this.template = document.getElementById("heroCard")
    this.place = place || document.querySelector(".showCard");
    this.name=info.name;
    this.title=info.title;
    this.imgSquareUrl=info.imgSquareUrl;
    this.imgLoadingUrl=info.imgLoadingUrl;
    console.log(info);
  }

  renderCard(){
    let clone = this.template.content.cloneNode(true);
    let card = clone.content.cloneNode(true);
    console.log(card);
  }
}
