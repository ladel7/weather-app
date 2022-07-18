var apiKey = "eec790e544b831eb1307518e7e3d5c07";
var apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?";

function formatDate(timezone) {
  let currentDate = new Date();
  let currentTime = currentDate.getTime();
  let offset = currentDate.getTimezoneOffset() * 60000;
  let localDate = new Date(currentTime + offset + 1000 * timezone);

  let dayIndex = localDate.getDay();
  let hour = localDate.getHours();
  let minutes = localDate.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = document.querySelector("#date");
  dayOfWeek.innerHTML = `${days[dayIndex]}`;
  let timeOfDay = document.querySelector("#time");

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeOfDay.innerHTML = `${hour}:${minutes}`;
}
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#precip").innerHTML =
    response.data.weather[0].description;
  fahrenheit = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = Math.round(fahrenheit);
  document
    .querySelector("#condition-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  formatDate(response.data.timezone);
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
function toFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempF = document.querySelector("#current-temp");
  tempF.innerHTML = Math.round(fahrenheit);
}
function toCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempC = document.querySelector("#current-temp");
  celsius = (fahrenheit - 32) * (5 / 9);
  tempC.innerHTML = Math.round(celsius);
}

let fahrenheit = null;
let celsius = null;

let fahrenheitLink = document.querySelector("a#fahrenheit");
let celsiusLink = document.querySelector("a#celsius");
fahrenheitLink.addEventListener("click", toFahrenheit);
celsiusLink.addEventListener("click", toCelsius);

search("New York");

let newSearch = document.querySelector("#search-submit");
newSearch.addEventListener("click", changeCity);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
