const searchBtn = document.getElementById("movie-search");
const moviesListEl = document.getElementById("movies-list");

searchBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch(
    "http://www.omdbapi.com/?apikey=your-api-key&s=blade+runner"
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
            <button>Add to watchlist</button>
            </div>
            <p class="grid-item movie-summary">
            Summary of the movie goes here from the API call.Summary of the movie
            goes here from the API call. Summary of the movie goes here from the
            API
            </p>
        </div>
        `;
    moviesListEl.innerHTML += html;
  });
});
