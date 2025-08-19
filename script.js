const apiKey = "";
const year = "2025";
const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}&year=${year}`;

const content = document.getElementById("content");
const moviePosterUrl = `https://image.tmdb.org/t/p/w500/`

async function displayMovies(url,imgUrl) {
  const response = await fetch(url);
  const movies = await response.json();
  //   loop through APIs
  movies.results.forEach((data) => {
    const movieElement = document.createElement("div");
    const title = document.createElement("h2");
    const image = document.createElement('img');
    title.innerHTML = `${data.title}`;
    image.src = `${imgUrl}${data.poster_path
}`
    movieElement.appendChild(title);
    movieElement.appendChild(image)
    content.appendChild(movieElement)
    console.log(movies)
  });
}

displayMovies(url, moviePosterUrl);
