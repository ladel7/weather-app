var apiKey = "eec790e544b831eb1307518e7e3d5c07";
var apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?";

function formatDate(date) {
  let dayIndex = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = document.querySelector("li#date");
  dayOfWeek.innerHTML = `Today: ${days[dayIndex]}`;
  let timeOfDay = document.querySelector("li#time");

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeOfDay.innerHTML = `Time: ${hour}:${minutes}`;
}
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#precip").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function search(city) {
  let apiUrl = `${apiUrlStart}q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar");
  search(city.value);
}
function getCurrentCoords(position) {
  let apiUrl = `${apiUrlStart}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentCoords);
}
// function toFahrenheit(event) {
//   event.preventDefault();
//   let tempF = document.querySelector("#current-temp");
//   tempF.innerHTML = "18";
// }
// function toCelsius(event) {
//   event.preventDefault();
//   let tempC = document.querySelector("#current-temp");
//   tempC.innerHTML = "-8";
// }

let now = new Date();
formatDate(now);

search("New York");

let newSearch = document.querySelector("#search-submit");
newSearch.addEventListener("click", changeCity);

// let fahrenheit = document.querySelector("a#fahrenheit");
// let celsius = document.querySelector("a#celsius");
// fahrenheit.addEventListener("click", toFahrenheit);
// celsius.addEventListener("click", toCelsius);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
