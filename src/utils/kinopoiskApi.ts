const BASE_URL = "https://api.kinopoisk.dev/v1.4";

const key = import.meta.env.VITE_KEY

const getJson = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((err) => {
    throw new Error(err.message);
  });
};

export const getAllMovies = (args = {}) => {
  const {
    page = 1,
    genre = [],
    rating = [],
    year = []
  } = args;

  let url = `${BASE_URL}/movie?limit=50&page=${page}`;

  if (genre.length > 0) {
    const genreParams = genre.map(g => `genres.name=${encodeURIComponent(g)}`).join("&");
    url += `&${genreParams}`;
  }

  if (year.length > 0) {
    const yearParams = year.map(y => `year=${encodeURIComponent(y)}`).join("&");
    url += `&${yearParams}`;
  }

  if (rating.length > 0) {
    const [minRating, maxRating] = rating;
    if (minRating === maxRating) {
      url += `&rating.kp=${minRating}`;
    } else {
      url += `&rating.kp=${minRating}-${maxRating}`;
    }
  }

  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": key,
    },
  }).then(getJson);
}
  

export const getAllGenres = () =>
  fetch('https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name', {
    method: "GET",
    headers: {
      "X-API-KEY": key,
    },
  }).then(getJson);

export const getMovieById = (id: string) =>
  fetch(`${BASE_URL}/movie/${id}`, {
    method: "GET",
    headers: {
      "X-API-KEY": key,
    },
  }).then(getJson);
