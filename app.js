// Display time/ date, month, year, day

let now = new Date();
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${month} ${date}, ${year}`;
let h5 = document.querySelector("h5");
h5.innerHTML = `Local time - ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col">
    <p class="day-1">${formatDay(forecastDay.time)}</p>
     <div class="grow" id="emoji-1">
       <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt="icon"
          class="icon"
          width="75"
          height="75"
          />
      </div>
      <div class="temp-1">
        <span class="temp-max1">
          ${Math.round(forecastDay.temperature.maximum)}&#176; |
        </span>
        <span class="temp-min1"> ${Math.round(
          forecastDay.temperature.minimum
        )}&#176;
         </span>
        </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3e1d07e5c88teace8f4369785f8b069o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  console.log(response.data);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "3e1d07e5c88teace8f4369785f8b069o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "3e1d07e5c88teace8f4369785f8b069o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "3e1d07e5c88teace8f4369785f8b069o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Klaipeda");

// ------------------------------------------------------------------------
// function backgroundChange(description) {
//   if (descriptionElement === "Rain") {
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/rain.gif)";
//   } else if (descriptionElement === "Clear") {
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/clear.gif)";
//   } else if (descriptionElement === "Snow") {
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/snow.gif)";
//   }
// }
// Background
// switch (descrip) {
//   case "Snow":
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/snow.gif)";
//     break;
//   case "Scattered Clouds":
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/clouds.gif)";
//     break;
//   case "Clear Sky":
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/clear.gif)";
//     break;
//   case "Fog":
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/fog.gif)";
//     break;
//   case "Rain":
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/rain.gif)";
//     break;
//   case "Thunderstorm":
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/thunderstorm.gif)";
//     break;
//   default:
//     document.getElementById("wrapper-bg").style.backgroundImage =
//       "url(image/earlymorn.gif)";
//     break;
// }
// let main = response.data.condition.description;
// console.log(main);

// let setBackground = document.querySelector(".app");
// let changeFontColor = document.querySelector(".details");
// let changeCenterColor = document.querySelector("#center");

// switch (main) {
//   case "Snow":
//     let style = weatherCondition.style;
//     style.background = `url("https://media0.giphy.com/media/7tYNMJ29GcbE4/giphy.gif")`;
//     style.width = "100%";
//     style.height = "100%";
//     style.position = "absolute";
//     style.left = "0px";
//     style.top = "0px";
//     style.zIndex = "2000";
//     console.log("hello");
//     break;
//   default:
//     console.log("default case");
// }

// if (response.data.condition.description <= 3) {
//   setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/3801464/pexels-photo-3801464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
//   setBackground.style.backgroundSize = "cover";
//   changeFontColor.style.color = "rgba(245, 238, 220)";
//   changeFontColor.style.opacity = "0.8";
//   changeCenterColor.style.color = "rgba(245, 238, 220)";
//   changeCenterColor.style.opacity = "0.8";
// } else if (response.data.condition.description <= 10) {
//   setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/5192874/pexels-photo-5192874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
//   setBackground.style.backgroundSize = "cover";
//   changeFontColor.style.color = "rgba(245, 238, 220)";
//   changeFontColor.style.opacity = "0.8";
//   changeCenterColor.style.color = "rgba(245, 238, 220)";
//   changeCenterColor.style.opacity = "0.8";
// } else if (response.data.condition.description >= 25) {
//   setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")`;
//   setBackground.style.backgroundSize = "cover";
//   changeFontColor.style.color = "black";
//   changeCenterColor.style.color = "black";
// } else if (response.data.condition.description >= 30) {
//   setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/998653/pexels-photo-998653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
//   setBackground.style.backgroundSize = "cover";
// } else {
//   setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")`;
//   setBackground.style.backgroundSize = "cover";
//   changeFontColor.style.color = "black";
//   changeCenterColor.style.color = "rgba(245, 238, 220)";
// }
