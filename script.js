const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const movieContainer = document.getElementById('movie-container');
const search = document.getElementById('search');
const searchButton = document.getElementById('search-button');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
}

function showMovies(movies) {
  movieContainer.innerHTML = '';

  movies.forEach((movie) => {
    const { id, title, poster_path, vote_average, overview } = movie;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="rating">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

    movieElement.addEventListener('click', () => {
      window.location.href = `movie.html?id=${id}`;
    });

    movieContainer.appendChild(movieElement);
  });
}

searchButton.addEventListener('click', () => {
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
