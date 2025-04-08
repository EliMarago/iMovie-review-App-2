const imgPath = `https://image.tmdb.org/t/p/w1280`;

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getData(query) {
  try {
    const response = await fetch(`/.netlify/functions/index?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    showMovies(data.results);
  } catch (err) {
    console.error("Errore nel caricamento dei dati:", err);
  }
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
        <span class="${getClassRate(vote_average)}">${vote_average.toFixed(1)}</span>
      </div>
      <div class="overview">
        <h3>${title}</h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassRate(vote) {
  if (vote >= 8) return "green";
  if (vote >= 5) return "orange";
  return "red";
}

// Mostra i film popolari all'avvio
getData("");

// Gestione ricerca
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    getData(searchTerm);
    search.value = "";
  } else {
    alert("Inserisci una parola chiave!");
  }
});
