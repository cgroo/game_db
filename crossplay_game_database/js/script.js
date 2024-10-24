const gamesDatabase = [
    {
        title: "Game 1",
        genre: ["fps"],
        platforms: ["pc", "xbox-one"],
        rating: 4.5
    },
    {
        title: "Game 2",
        genre: ["mmorpg"],
        platforms: ["ps4", "pc"],
        rating: 4.0
    },
];

function searchGames() {
    const genre = document.getElementById("genre").value;
    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(checkbox => checkbox.value);
    const filteredGames = gamesDatabase.filter(game => {
        const matchesGenre = genre === "all" || game.genre.includes(genre);
        const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.every(platform => game.platforms.includes(platform));
        return matchesGenre && matchesPlatform;
    });

    displayGames(filteredGames);
}

function displayGames(games) {
    const gamesList = document.getElementById("gamesList");
    gamesList.innerHTML = "";

    if (games.length === 0) {
        gamesList.innerHTML = "<p>No games found</p>";
        return;
    }

    games.forEach(game => {
        const gameItem = document.createElement("div");
        gameItem.className = "game-item";
        gameItem.innerHTML = `
            <h3>${game.title}</h3>
            <p>Genre: ${game.genre}</p>
            <p>Platforms: ${game.platforms.join(", ")}</p>
            <p>Rating: ${game.rating}</p>
        `;
        gamesList.appendChild(gameItem);
    });
}

document.getElementById("searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    searchGames();
});

