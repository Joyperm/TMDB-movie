// const apiKey = "74a306562fe2ccbe8ce63aa8ec2eecc8";
let year = "2025";
// const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}&year=${year}`;

const content = document.getElementById("content");
const moviePosterUrl = `https://image.tmdb.org/t/p/w500/`;

// get selected year from dropdown
const yearSelected = document.getElementById("year");

async function displayMovies(year) {
  const response = await fetch(`http://localhost:5000/api/movies?year=${year}`);
  const movies = await response.json();
  // clear old data base on filters
  content.innerHTML = "";

  //   loop through APIs
  movies.results.forEach((data) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const title = document.createElement("h2");
    const image = document.createElement("img");

    title.innerHTML = `${data.title.substring(0, 24)}`;
    image.src = `${moviePosterUrl}${data.poster_path}`;
    
    movieElement.appendChild(title);
    movieElement.appendChild(image);
    content.appendChild(movieElement);
    // console.log(movies);
  });
}

yearSelected.addEventListener("change", () => {
  year = yearSelected.value;
  displayMovies(year);
});

displayMovies(year);
