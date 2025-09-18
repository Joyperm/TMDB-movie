let year = "2025";
// const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}&year=${year}`;

const content = document.getElementById("content");
const moviePosterUrl = `https://image.tmdb.org/t/p/w500/`;
// const backend_api = "http://localhost:5000";
// modal
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const movieDetailsContainer = document.getElementById("movie-details");

// get selected year from dropdown
const yearSelected = document.getElementById("year");

// async function displayMovies(year) {
//   const response = await fetch(`${BACKEND_API}/api/movies?year=${year}`);
//   // const response = await fetch(`${backend_api}/api/movies?year=${year}`); //for testing local
//   const movies = await response.json();
//   // clear old data base on filters
//   content.innerHTML = "";

//   //   loop through APIs
//   movies.results.forEach((data) => {
//     const movieElement = document.createElement("div");
//     movieElement.classList.add("movie");

//     const title = document.createElement("h2");
//     const image = document.createElement("img");

//     title.innerHTML = `${data.title.substring(0, 24)}`;
//     image.src = `${moviePosterUrl}${data.poster_path}`;

//     movieElement.appendChild(title);
//     movieElement.appendChild(image);
//     content.appendChild(movieElement);
//     // console.log(movies);

//     movieElement.addEventListener("click", async () => {
//       const movieID = data.id;
//       const movie = await displayMovieDetails(movieID); // fetch movie details
//       const trailerKey = await displayMovieTrailer(movieID);

//       const genres = movie.genres.map((g) => g.name).join(", ");

//       movieDetailsContainer.innerHTML = `
//       <h1>${movie.title}</h1>
//       <p><strong>Overview:</strong> ${movie.overview}</p>
//       <p><strong>Genres:</strong> ${genres}</p>
//       <p class="rate"><strong>Rating:</strong> ${movie.vote_average.toFixed(2)}/10</p>
//       ${
//         trailerKey
//           ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>`
//           : `<p>No trailer available</p>`
//       }`;

//       modal.style.display = "block"; // show modal

//     });

//     // Close modal when user clicks the X
//     closeModal.onclick = function () {
//       modal.style.display = "none";
//     };

//     // Close modal when user clicks outside modal content
//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     };
//   });
// }

async function displayMovies(year) {
  // Show loading
  const loading = document.getElementById("loader");
  loading.style.display = "block";
  content.innerHTML = ""; // clear old content

  try {
    const response = await fetch(`${BACKEND_API}/api/movies?year=${year}`);
    const movies = await response.json();

    // Hide loading after data arrives
    loading.style.display = "none";

    // Render movies
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

      movieElement.addEventListener("click", async () => {
        const movieID = data.id;
        const movie = await displayMovieDetails(movieID);
        const trailerKey = await displayMovieTrailer(movieID);

        const genres = movie.genres.map((g) => g.name).join(", ");

        movieDetailsContainer.innerHTML = `
          <h1>${movie.title}</h1>
          <p><strong>Overview:</strong> ${movie.overview}</p>
          <p><strong>Genres:</strong> ${genres}</p>
          <p class="rate"><strong>Rating:</strong> ${movie.vote_average.toFixed(
            2
          )}/10</p>
          ${
            trailerKey
              ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>`
              : `<p>No trailer available</p>`
          }`;

        modal.style.display = "block";
      });

      // Close modal when user clicks the X
      closeModal.onclick = function () {
        modal.style.display = "none";
      };

      // Close modal when user clicks outside modal content
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  } catch (error) {
    loading.innerHTML = "Failed to load movies 😢";
    console.error(error);
  }
}

async function displayMovieDetails(id) {
  const response = await fetch(`${BACKEND_API}/api/movie/${id}`);
  const movie = await response.json();
  return movie; // now returns full movie object
}

async function displayMovieTrailer(id) {
  const response = await fetch(`${BACKEND_API}/api/movie/trailer/${id}`);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    // There is at least one trailer
    if (data.results[0].key) {
      return data.results[0].key;
    } else {
      return null; // first trailer has no key
    }
  } else {
    return null; // results array is empty or undefined
  }
}

yearSelected.addEventListener("change", () => {
  year = yearSelected.value;
  displayMovies(year);
});

displayMovies(year);
