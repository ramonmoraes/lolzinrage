window.onload = () => {

  const createOptions = (list) => {
    let template = document.getElementById('heroOption');
    let heroList = document.getElementById('herolist')
    heroList.innerHTML='';

    for (var i = 0; i < list.length; i++) {
      let clone = template.content.cloneNode(true);
      let option = clone.querySelector("option");
      option.value=list[i].name
      heroList.appendChild(option);
    }
  }

  const search = new TypeAhead (document.getElementById('search'),createOptions);

}
