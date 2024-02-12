const moviesListEl = document.getElementById("watchlist-list");

let moviesWatchlist = JSON.parse(localStorage.getItem("movies-to-watch"));

let moviesArray = Array.from(moviesWatchlist);
moviesArray = [...new Set(moviesArray)];

loadMovies();

function loadMovies() {
  moviesListEl.innerHTML = "";
  moviesArray.forEach(async (movieId, movieIdx) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=4de60fd5&i=${movieId}`
    );
    const movie = await response.json();

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
                    <button class='btn watchlist-btn' data-movie-id=${movie.imdbID}>Remove</button>
                    </div>
                    <p class="grid-item movie-summary">
                    Summary of the movie goes here from the API call.Summary of the movie
                    goes here from the API call. Summary of the movie goes here from the
                    API
                    </p>
                </div>
                `;

    moviesListEl.innerHTML += html;
    if (movieIdx === moviesArray.length - 1) {
      console.log("all movies in the DOM now");
      addEventListeners();
    }
  });
}

// update watchlist in localstorage
function addEventListeners() {
  console.log("adding event listeners now");
  const removeBtnArray = document.getElementsByClassName("watchlist-btn");
  console.log(removeBtnArray);
  for (let btn of removeBtnArray) {
    btn.addEventListener("click", (e) => {
      console.log("clicked");
      e.preventDefault();
      console.log("clicked");
      // remove movie when button clicked
      if (e.target.dataset.movieId) {
        console.log(moviesArray);
        const movieIndex = moviesArray.indexOf(e.target.dataset.movieId);
        console.log(movieIndex);
        if (movieIndex > -1) {
          moviesArray.splice(movieIndex, 1);
          //update local storage and reload list
          localStorage.setItem("movies-to-watch", JSON.stringify(moviesArray));
          loadMovies();
        }
        console.log(moviesArray);
      }
    });
  }
}
