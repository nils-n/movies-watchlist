const movieSearchBtn = document.getElementById("search-btn");
const movieSearchForm = document.getElementById("movie-search-form");
const moviesListEl = document.getElementById("movies-list");
const initialImgEl = document.getElementById("no-data-initial");

let moviesWatchlist = JSON.parse(localStorage.getItem("movies-to-watch"));
if (moviesWatchlist === null || moviesWatchlist.length === 0) {
  moviesWatchlist = [];
}

// search for movie by calling OMDb api
movieSearchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  initialImgEl.classList.add("hidden");
  const searchFormData = new FormData(movieSearchForm);
  const movieKeywords = searchFormData
    .get("movie-input")
    .replace(" ", "+")
    .replace(" ", "");

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=4de60fd5&s=${movieKeywords}`
  );
  const data = await response.json();
  data.Search.forEach(async (movie) => {
    // second API call to ask for more details of each movie
    const secondResponse = await fetch(
      `https://www.omdbapi.com/?apikey=4de60fd5&i=${movie.imdbID}`
    );
    const movieData = await secondResponse.json();
    const html = `
          <div class="movies-item">
            <img
            class="grid-item movie-image"
            src=${movieData.Poster}
            />
            <h3 class="grid-item movie-header">${movie.Title}</h3>
            <div class="grid-item movie-subheader">
            <div>
              <p>${movieData.Runtime}</p>
              <p>${movieData.Genre}</p>
            </div>
            <button class='btn watchlist-btn' data-movie-id=${movieData.imdbID}>Add to watchlist</button>
            </div>
            <p class="grid-item movie-summary">
            ${movieData.Plot}
            </p>
          </div>
        `;
    moviesListEl.innerHTML += html;
    addEventListeners();
  });
});

// update watchlist in localstorage
function addEventListeners() {
  let addToWatchlistBtnArray = document.getElementsByClassName("watchlist-btn");

  for (let btn of addToWatchlistBtnArray) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.dataset.movieId) {
        console.log(e.target.dataset.movieId);

        moviesWatchlist.push(e.target.dataset.movieId);
        localStorage.setItem(
          "movies-to-watch",
          JSON.stringify(moviesWatchlist)
        );
      }
    });
  }
}
