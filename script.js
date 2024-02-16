const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const moviesContainer = document.getElementById('movies');


async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}


async function showMovies(url) {
  const movies = await getMovies(url);

  moviesContainer.innerHTML = ''; 

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

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
        ${overview}
      </div>
    `;

    moviesContainer.appendChild(movieElement);
  });
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    showMovies(SEARCH_API + searchTerm);

    search.value = ''; 
  } else {
    window.location.reload(); 
  }
});

showMovies(API_URL);
