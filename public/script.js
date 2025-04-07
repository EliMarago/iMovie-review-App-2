const imgPath = `https://image.tmdb.org/t/p/w1280`;
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// Funzione per chiamare il backend
async function getData(query = "") {
  const url = query
    ? `/.netlify/functions/movies?query=${encodeURIComponent(query)}`
    : `/.netlify/functions/movies`;

  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${imgPath + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassRate(vote_average)}">${vote_average.toFixed(2)}</span>
      </div>
      <div class="overview">
        <h3>${title}</h3>
        ${overview}
      </div>`;
    main.appendChild(movieEl);
  });
}

function getClassRate(vote) {
  if (vote >= 8) return "green";
  else if (vote >= 5) return "orange";
  else return "red";
}

// Carica i film popolari all'avvio
getData();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerms = search.value;

  if (searchTerms && searchTerms !== "") {
    getData(searchTerms);
    search.value = "";
  } else {
    window.location.reload();
  }
});
