window.onload = () => {

  const createOptions = (list) => {
    let template = document.getElementById('heroOption');
    let heroList = document.getElementById('herolist')

    let clone = template.content.cloneNode(true);
    let datalist=clone.querySelector("datalist");

    for (var i = 0; i < list.length; i++) {

      let option = clone.querySelector("datalist option");
      clone = template.content.cloneNode(true);
      option.value=list[i].name;
      option.innerHTML=list[i].title;
      datalist.appendChild(option);
    }
    renderOptions(datalist, heroList);
  }

  const renderOptions = (datalist,heroList) => {
    if(heroList.children.length===0){
      heroList.appendChild(datalist.cloneNode(true))
    }else{
      heroList.replaceChild(datalist.cloneNode(true),heroList.childNodes[1])
    }
  }

  const search = new TypeAhead (document.getElementById('search'),createOptions);

  fetch('/hero/Nasus',{method:"GET"})
  .then((res) => {
    res.json()
    .then((info) => {
      const card = new HeroCard(info);
    })
  })
}
