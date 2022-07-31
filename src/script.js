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

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let visibilityElement = document.querySelector("#visibility");
  let pressureElement = document.querySelector("#pressure");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  visibilityElement.innerHTML = Math.round(response.data.visibility / 1000);
  pressureElement.innerHTML = Math.round(response.data.main.pressure / 1000);
}

let apiKey = "5b0fc91c6e7515d2df886d62bdfd2ab4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`;

displayDate();
axios.get(apiUrl).then(displayTemperature);
