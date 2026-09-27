const title = document.getElementById("mainTitle");
console.log(title);
title.textContent = "What should I watch?";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const randomBtn = document.getElementById("randomBtn");

let latestResults = [];
let watchlist = [];

searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value;

    if (searchTerm === "") {
        message.textContent = "Please enter a show name.";
        return;
    } else {
        message.textContent = "You searched for: " + searchTerm;
    }

    fetch("https://api.tvmaze.com/search/shows?q=" + searchTerm)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            latestResults = data;

            const results = document.getElementById("results");

            if (data.length === 0) {
                results.innerHTML = `
                  <p class="text-slate-400 col-span-full text-center">
                    No shows found. Try another search.
                  </p>
                `;
                return;
            }

            results.innerHTML = "";
            data.forEach(function (item) {
                const show = item.show;
                results.innerHTML += `
                  <article class="bg-slate-900 rounded-2xl overflow-hidden">
                    <img
                      src="${show.image ? show.image.medium : 'https://placehold.co/300x420?text=No+Image'}"
                      class="w-full h-72 object-cover"
                      alt="${show.name}">
                    <div class="p-5">
                      <h2 class="text-xl font-bold">${show.name}</h2>
                      <p class="text-slate-400 mt-2">
                        ${show.genres.join(", ") || "Genre unavailable"}
                      </p>
                      <p class="text-yellow-400 mt-3">
                        Rating: ${show.rating.average ?? "N/A"}
                      </p>
                    </div>
                  </article>
                `;
            });
        });
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click(); // Programmatically triggers the search button click handler
    }
});

randomBtn.addEventListener("click", function () {
    if (latestResults.length === 0) {
        message.textContent = "Search for some shows first.";
        return;
    }

    const randomNumber = Math.floor(Math.random() * latestResults.length);
    const randomShow = latestResults[randomNumber].show;
    message.textContent = "Tonight's pick: " + randomShow.name;
});

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');

    // Redirect back to login if no session exists
    if (isLoggedIn !== 'true') {
        window.location.href = 'signup-index.html'; 
        return;
    }

    console.log(`Welcome back, ${userEmail}!`);
});