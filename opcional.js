const pizzas = document.getElementById("pizzas")

let pizzasArr
fetch('http://localhost:3000/pizza')
  .then(response => response.json())
  .then(data => {
    pizzasArr = data
    mostrarPizzas(pizzasArr)
  });

document.getElementById("boton").addEventListener('click', () => {
    const texto = document.getElementById("searchText")
    pizzasArr = pizzasArr.filter(pizzas => pizzas.Descripcion.toLowerCase().includes(texto.value.toLowerCase()));
    mostrarPizzas(pizzasArr);
})

function mostrarPizzas(pizzasArr) {
    pizzas.innerHTML = ""
    pizzasArr.forEach(element => {
        unLi = document.createElement("li")
        unLi.innerHTML = `<b> ${element.Nombre} </b>: ${element.Precio} - ${element.Descripcion}`;
        pizzas.appendChild(unLi)
        
    });
}