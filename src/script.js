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
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index < 4) {
      forecastHTML += `<div class="col-3 forecast">
      ${formatForecastDay(day.dt)}
      <div>
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt=""
          class="fore-pic"
        />
        <div class="fore-temp">${Math.round(day.temp.max)}°/${Math.round(
        day.temp.min
      )}°</div>
      </div>
    </div>`;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiUrl = `${apiUrlStart}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
  getForecast(response.data.coord);
}
function search(city) {
  let apiUrl = `${apiUrlStart}weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar");
  search(city.value);
}
function getCurrentCoords(position) {
  let apiUrl = `${apiUrlStart}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentCoords);
}
function toFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempF = document.querySelector("#current-temp");
  tempF.innerHTML = Math.round(fahrenheit);
}
function toCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempC = document.querySelector("#current-temp");
  celsius = (fahrenheit - 32) * (5 / 9);
  tempC.innerHTML = Math.round(celsius);
}

var apiKey = "eec790e544b831eb1307518e7e3d5c07";
var apiUrlStart = "https://api.openweathermap.org/data/2.5/";

let fahrenheit = null;
let celsius = null;

let fahrenheitLink = document.querySelector("a#fahrenheit");
let celsiusLink = document.querySelector("a#celsius");
fahrenheitLink.addEventListener("click", toFahrenheit);
celsiusLink.addEventListener("click", toCelsius);

let newSearch = document.querySelector("#search-submit");
newSearch.addEventListener("click", changeCity);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("New York");
