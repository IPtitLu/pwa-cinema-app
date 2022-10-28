const form = document.getElementById("form");
const input = document.getElementById("input");
const filmResult = document.getElementById("film-card");

let recherche = "";
let filmData = [];

const getFilms = async () => {
  filmData = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=62eec8dcad2c6fda69b92e74483e93cc&query=${recherche}`
  ).then((res) => res.json());
};

const filmCard = async () => {
  await getFilms();

  filmData.results.length = 12;

  console.log(filmData.results)

  filmResult.innerHTML = filmData.results
    .map(
      (film) =>
        `
      <li class="card">
        <div class="card-content">
          <h2>${film.original_title}</h2>
          <p>${film.overview}</p>
          <p>Popularité : ${film.popularity} ❤️</p>
        </div>
        <div class="card-img">
          <img src="https://image.tmdb.org/t/p/w500${film.poster_path}"></img>
        </div>
      </li>
    `
    )
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  recherche = input.value;
  filmCard();
});
