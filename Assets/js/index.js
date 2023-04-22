const BASE_URL = "https://digimon-api.vercel.app/api/digimon/";

fetch(`${BASE_URL}`)
  .then((response) => response.json())
  .then((data) => {
    let personajes = data;
    let html = "";
    for (let personaje of personajes) {
      html += `
        <div class="card p-2 mb-2" style="width: 18rem;" id="front_card">
        <img src="${personaje.img}" class="card-img-top" alt="Imagen de: ${personaje.name}">
            <div class="card-body text-center" id="text_card">
                <h3 class="card-title">${personaje.name}</h3>
                <h5>Nivel:<br>${personaje.level}</h5>
            </div>
        </div>
        `;
    }
    document.getElementById("menu_card").innerHTML += html;
  })
  .catch((error) => alert("No se pudo obtener la información"));

let button = document.getElementById("btn-buscador");

button.addEventListener("click", function () {
  let buscar_digimon = document.getElementById("inputBuscador").value;
  fetch(`${BASE_URL}name/${buscar_digimon}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let imagen_digimon = data[0].img;
      let nombre_digimon = data[0].name;
      let nivel_digimon = data[0].level;
      let card_digimon = `
        <div class="card" style="width: 18rem;" id="front_card">
        <img src="${imagen_digimon}" class="card-img-top" alt="Imagen de: ${nombre_digimon}">
            <div class="card-body text-center" id="text_card">
                <h3 class="card-title">${nombre_digimon}</h3>
                <h5>Nivel:<br>${nivel_digimon}</h5>
            </div>
        </div>
        `;
      document.getElementById("container_card").innerHTML = card_digimon;
    })
    .catch((error) => {
      let myModal = new bootstrap.Modal("#modal_error");
      myModal.show();
    });
});
