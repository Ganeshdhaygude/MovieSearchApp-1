const inputsearch = document.getElementById("inputsearch");
const searchButton = document.getElementById("searchButton");
const movieResults = document.getElementById("movieResults");

// Attach an event listener to the search button
inputsearch.addEventListener("keypress", debounce(searchMovies, 900)); // Debounce the searchMovies function with a 900ms delay

function searchMovies() {
    const searchTerm = inputsearch.value.trim();

    if (searchTerm === '') {
        alert("Please enter a movie title");
    } else {
        // Construct the OMDB API URL with the user's search term
        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=40987468`;

        // Clear previous search results
        movieResults.innerHTML = "";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') { // Check for a successful response
                    const movies = data.Search;
                    movies.forEach(movie => {
                        const movieCard = document.createElement("div");
                        movieCard.classList.add("movieCard");
                        movieCard.innerHTML = `
                            <img src="${movie.Poster}" alt="${movie.Title}">
                            <h2>${movie.Title}</h2>
                            <p>${movie.Year}</p>
                        `;
                        movieResults.appendChild(movieCard);
                        

                    });
                } else {
                    movieResults.innerHTML = "<p>No results</p>";
                }
            })
            .catch(error => {
                console.log("Error", error);
            });
    }
}

function debounce(func, delay) {
    
    let timerId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timerId);

        timerId = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}
