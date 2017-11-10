'use strict'

class HeroCard {

  constructor(info,place){
    this.template = document.getElementById("heroCard");
    this.place = place || document.querySelector(".showCard");
    this.name=info.name;
    this.title=info.title;
    this.imgSquareUrl=info.imgSquareUrl;
    this.imgLoadingUrl=info.imgLoadingUrl;
  }

  url(link){
    return "url("+ link +")";
  }

  createCard(){
    let card = this.template.content.cloneNode(true);
    let container = document.getElementById("cardContainer")
    card.querySelector('h1').innerHTML=this.name;
    card.querySelector('h3').innerHTML=this.title;
    card.querySelector('.heroCard').style.backgroundImage=this.url(this.imgLoadingUrl);
    this.renderCard(container, card)
  }
  renderCard(container, card){
    if(container.children.length===0) {
      container.appendChild(card);
    }else{
      container.replaceChild(card,container.querySelector(".heroCard"));

    }
  }
  }
