window.onload = () => {

  const createOptions = (list) => {
    for (var key in list) {
      let template = document.getElementById('heroOption');
      let clone = template.content.cloneNode(true);
      let name = clone.querySelectorAll("option");
      clearTemplate(template,clone,name);
      name[0].value=list[key].name;
      template.parentNode.appendChild(clone)
    }
  }

  const clearTemplate = (template, clone,name) => {
    let x = template.parentNode;
    console.log(x.querySelector("option"));

  }

  const search = new TypeAhead (document.getElementById('search'),createOptions);






}
