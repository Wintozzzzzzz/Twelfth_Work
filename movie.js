const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const movieDetailsContainer = document.getElementById('movie-details');

getMovieDetails();

async function getMovieDetails() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await response.json();

  showMovieDetails(movie);
}

function showMovieDetails(movie) {
  const { title, poster_path, overview, vote_average } = movie;

  const movieDetailsElement = document.createElement('div');
  movieDetailsElement.classList.add('movie-details');
  movieDetailsElement.innerHTML = `
    <h2>${title}</h2>
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <p>Rating: ${vote_average}</p>
    <p>${overview}</p>
  `;

  movieDetailsContainer.appendChild(movieDetailsElement);
}
