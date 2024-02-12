const movieSearchBtn = document.getElementById("search-btn");
const movieSearchForm = document.getElementById("movie-search-form");
const moviesListEl = document.getElementById("movies-list");

let moviesWatchlist = [];

// search for movie by calling OMDb api
movieSearchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchFormData = new FormData(movieSearchForm);
  const movieKeywords = searchFormData
    .get("movie-input")
    .replace(" ", "+")
    .replace(" ", "");

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=4de60fd5&s=${movieKeywords}`
  );
  const data = await response.json();
  data.Search.forEach((movie) => {
    const html = `
            <div class="movies-item">
            <img
            class="grid-item movie-image"
            src=${movie.Poster}
            />
            <h3 class="grid-item movie-header">${movie.Title}</h3>
            <div class="grid-item movie-subheader">
            <p>x min</p>
            <p>Category, Category, Category</p>
            <button class='btn watchlist-btn' data-movie-id=${movie.imdbID}>Add to watchlist</button>
            </div>
            <p class="grid-item movie-summary">
            Summary of the movie goes here from the API call.Summary of the movie
            goes here from the API call. Summary of the movie goes here from the
            API
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
