let apiKey = "5b0fc91c6e7515d2df886d62bdfd2ab4";

function displayDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = response.data.daily;

  let forecastHTML = "";

  days.forEach((day, index) => {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   <div class="col day-forecast">
            <div class="forecast-date">${formatDay(day.dt)}</div>
            <img
              class="day-forecast-img"
              src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png"
              alt=""
            />
            <div class="forecast-temperatures">
              <span class="forecast-day-temperature">${Math.round(
                day.temp.day
              )}°</span>
              <span class="forecast-night-temperature">${Math.round(
                day.temp.night
              )}°</span>
            </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

displayDate();

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let visibilityElement = document.querySelector("#visibility");
  let pressureElement = document.querySelector("#pressure");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = Math.round(response.data.main.temp);
  celciusFeelsLike = Math.round(response.data.main.feels_like);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  visibilityElement.innerHTML = Math.round(response.data.visibility / 1000);
  pressureElement.innerHTML = Math.round(response.data.main.pressure / 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelciumTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let feelsLikeElement = document.querySelector("#feels-like");

  fahrenheitLink.classList.remove("active");
  celciumLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  feelsLikeElement.innerHTML = Math.round(celciusFeelsLike);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let feelsLikeElement = document.querySelector("#feels-like");

  celciumLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let fahrenheitFeelsLike = (celciusFeelsLike * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  feelsLikeElement.innerHTML = Math.round(fahrenheitFeelsLike);
}

let celciusTemperature = null;
let celciusFeelsLike = null;

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciumLink = document.querySelector("#to-celcium");
celciumLink.addEventListener("click", displayCelciumTemperature);

let fahrenheitLink = document.querySelector("#to-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
