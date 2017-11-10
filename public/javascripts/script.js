window.onload = () => {
  let heroName=document.getElementById("heroName");
  const newPostBtn = document.getElementById('newPostBtn');

  const createnewComment = () => {
    let newComment = document.querySelector(".newPost");
    let heroName = newComment.querySelectorAll("input")[0].value;
    post = {
      name:newComment.querySelectorAll("input")[1].value,
      text:newComment.querySelector("textarea").value
    }
    fetch('/post/'+heroName,{method:'POST'})
  }

  newPostBtn.addEventListener('click', createnewComment);

  const getCommentsOnHero = (heroName,placeHolder) => {
    let comment = new Comments('ramon','olaqtal',placeHolder);
    document.querySelector(".createPostContainer").style.visibility='visible';
  }

  const onComplete = (name) => {
    fetch('/hero/'+name ,{method:"GET"})
    .then((res) => {
      res.json()
      .then((info) => {
        if(info){
          const card = new HeroCard(info);
          card.createCard();
          heroName.value=info.name;
          const comentarioPlaceHolder = document.getElementById("comentarioContainer");
          getCommentsOnHero(info.name,comentarioPlaceHolder);
        }
      })
    })
  }

  onComplete("Fiora");
  const search = new TypeAhead (document.getElementById('search'),onComplete);

}
