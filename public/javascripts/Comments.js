'use strict'

class Comments {

  constructor(name,text,placeHolder){
    this.name=name;
    this.text=text;
    this.placeHolder=placeHolder;
    this.createComments();

  }

  createComments(){
    let template = document.getElementById("comentario");
    let comentario=template.content.cloneNode(true);
    comentario.querySelector("h1").innerHTML=this.name+" disse : " ;
    comentario.querySelector("p").innerHTML="'"+this.text+"'";
    this.renderComentario(comentario)
  }

  renderComentario(comentario){
      this.placeHolder.appendChild(comentario)
  }

  refreshPlaceHolder(){
    placeHolder.innerHTML='';
  }
}
