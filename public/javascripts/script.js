window.onload = () => {

  const createnewComment = () => {
    let newComment = document.querySelector(".newPost");
    let heroName = newComment.querySelectorAll("input")[0].value;

    let post = {
      user:newComment.querySelectorAll("input")[1].value,
      text:newComment.querySelector("textarea").value
    }

    let options = {
      method:"POST",
      body:JSON.stringify(post),
      headers: {'Content-Type':'application/json'}
    }

    fetch('/posts/'+heroName,options)
    .then((res) => {
      res.json()
      .then((done) => {
        onComplete(heroName);
      })
    })
  }

  const newPostBtn = document.getElementById('newPostBtn');
  newPostBtn.addEventListener('click', createnewComment);

  const getCommentsAboutHero = (heroName,placeHolder) => {
    document.querySelector(".createPostContainer").style.visibility='visible';
    fetch('/posts/'+heroName,{method:"GET"})
    .then((res) => {
      res.json()
      .then((listOfPosts) => {
          for (var i = 0; i < listOfPosts.length; i++) {
            name=listOfPosts[i].user;
            text=listOfPosts[i].text
            new Comments(name,text,placeHolder);
          }

      })
    })
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
          getCommentsAboutHero(info.name,comentarioPlaceHolder);
        }
      })
    })
  }

  // onComplete("Fiora");
  const search = new TypeAhead (document.getElementById('search'),onComplete);

}
