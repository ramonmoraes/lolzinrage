'use strict'

class HeroCard {

  constructor(info,place){
    this.template = document.getElementById("heroCard");
    this.place = place || document.querySelector(".showCard");
    this.name=info.name;
    this.title=info.title;
    this.imgSquareUrl=info.imgSquareUrl;
    this.imgLoadingUrl=info.imgLoadingUrl;
    console.log(info);
  }

  renderCard(){
    let clone = this.template.content.cloneNode(true);
    clone.querySelector('h1').innerHTML=this.name;
    clone.querySelector('h3').innerHTML=this.title;
    clone.querySelector('.heroCard').style.backgroundImage=this.url(this.imgLoadingUrl);
    document.getElementById("cardContainer").appendChild(clone);
  }

  url(link){
    return "url("+ link +")";
  }
}
