window.onload = () => {

  const onComplete = (name) => {
    fetch('/hero/'+name ,{method:"GET"})
    .then((res) => {
      res.json()
      .then((info) => {
          if(info){
          const card = new HeroCard(info);
          card.createCard();
        }
      })
    })
  }

  const search = new TypeAhead (document.getElementById('search'),onComplete);

}
