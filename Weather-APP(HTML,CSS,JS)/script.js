let input = document.getElementById("input");
let searchButton = document.getElementById("searchButton");
let Name = document.getElementById("Name");
let temperature = document.getElementById("temperature");
let condition = document.getElementById("condition");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let loading = document.getElementById("loading");
let error = document.getElementById("error");
let recentCities = document.getElementById("recentCities");
let weatherIcon = document.getElementById("weatherIcon");

let savedSearches = localStorage.getItem("recentSearches");
let recentSearches = [];

if (savedSearches) {
    recentSearches = JSON.parse(savedSearches);
}

async function getWeather(city) {

    loading.style.display = "block";
    error.textContent = "";
    try {

        let response = await fetch(
            "https://api.weatherapi.com/v1/current.json?key=0e3fe2963c1143369f6174722261609&q=" + city
        );

        let data = await response.json();
        
        if (data.error) {
            alert("City not found");
        }

        Name.textContent = data.location.name;
        temperature.textContent = data.current.temp_c + "°C";
        condition.textContent = data.current.condition.text;
        humidity.textContent = data.current.humidity + "%";
        wind.textContent = data.current.wind_kph + " km/h";

        weatherIcon.src = "https:" + data.current.condition.icon;

        loading.style.display = "none";

        addRecentCity(city);

    } catch (err) {

        loading.style.display = "none";
        error.textContent = "City not found";

    }
}

function addRecentCity(city) {

    recentSearches.push(city);

    if (recentSearches.length > 3) {
        recentSearches.shift();
    }

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches)
    );

    recentCities.innerHTML = "";

    recentSearches.forEach(function(city) {

        let button = document.createElement("button");

        button.textContent = city;

        button.onclick = function() {
            getWeather(city);
        };

        recentCities.appendChild(button);

    });
}
searchButton.addEventListener("click", function() {

    let city = input.value.trim();

    if (city === "") {
        alert("Please enter a city");
        return;
    }
    getWeather(city);

});
