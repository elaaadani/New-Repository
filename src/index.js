let currentTime = new Date();

function Hoy(date) {
  let hora = currentTime.getHours();
  let minutos = currentTime.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let DiaActual = document.querySelector("h2#dia-actual");

  DiaActual.innerHTML = ` ${currentDay} ${currentMonth} ${currentDate} ${hora}:${minutos}`;
}
Hoy(currentTime);

function change_city(city_event) {
  city_event.preventDefault();
  let city_search = document.querySelector(".search1");
  let city_selector = document.querySelector("h1#ciudad-actual");
  city_selector.innerHTML = `${city_search.value}`;

  searchCity(city_search.value);
}

let funcion_1 = document.querySelector(".Search-form");
funcion_1.addEventListener("submit", change_city);

function searchCity(city) {
  let apiKey = "921a29e043e83d24341a625517d5a318";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
  &appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showFeelsLike);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperatura-actual");
  temperatureElement.innerHTML = `${temperature}`;
}

function showFeelsLike(response) {
  let feels = Math.round(response.data.main.feels_like);
  let feelsElement = document.querySelector("#feels-like");
  feelsElement.innerHTML = `${feels}`;
}

let button = document.querySelector("#bt2");
button.addEventListener("click", getPosition);

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let currentCity = document.querySelector("h1#ciudad-actual");
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "921a29e043e83d24341a625517d5a318";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showFeelsLike);
}
