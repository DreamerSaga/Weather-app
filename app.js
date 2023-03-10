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
h4.innerHTML = `${month}  ${date},  ${day},  ${year}`;
let h5 = document.querySelector("h5");
h5.innerHTML = `${hours}:${minutes}`;

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

  // Changes background picture depending on temperature

  const temperature1 = Math.round(response.data.temperature.current);
  const body = document.querySelector("#app");
  const backgroundImageUrls = {
    "Below 0": "url(img/1.jpg)",
    "0-5": "url(img/14.jpg)",
    "5-10": "url(img/10.jpg)",
    "10-15": "url(img/12.jpg)",
    "15-20": "url(img/3.jpg)",
    "20-25": "url(img/8.jpg)",
    "25-30": "url(img/9.jpg)",
    "30+": "url(img/7.jpg)",
  };
  let setBackground = document.querySelector("#app");

  let changeColorDetails = document.querySelector("#details");

  let changeFontColorDescr = document.querySelector("#description");

  let changeFontColorTemp = document.querySelector("#temperature");
  let changeFontColorCel = document.querySelector("#celsius");

  let changeFontColorCity = document.querySelector("#city");

  let changeColorDate = document.querySelector("#date");
  let changeColorTime = document.querySelector("#time");

  function setBackgroundImage(temp) {
    if (temp < 0) {
      body.style.backgroundImage = backgroundImageUrls["Below 0"];
      setBackground.style.color = "rgba(7,7,7)";
      changeFontColorTemp.style.color = "rgba(7,7,7)";
      changeFontColorCel.style.color = "rgba(7,7,7)";
      changeColorDetails.style.color = "rgba(7,7,7)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.8";
    } else if (temp >= 0 && temp < 5) {
      body.style.backgroundImage = backgroundImageUrls["0-5"];
      changeFontColorCity.style.color = "rgba(7,7,7)";
      changeFontColorDescr.style.color = "rgba(7,7,7)";
      changeColorDetails.style.color = "rgba(255,255,255)";
      changeFontColorTemp.style.color = "rgba(255,255,255)";
      changeFontColorCel.style.color = "rgba(255,255,255)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.75";
    } else if (temp >= 5 && temp < 10) {
      body.style.backgroundImage = backgroundImageUrls["5-10"];
      setBackground.style.color = "rgba(7,7,7)";
      changeFontColorTemp.style.color = "rgba(7,7,7)";
      changeColorDetails.style.color = "rgba(7,7,7)";
      changeFontColorDescr.style.color = "rgba(7,7,7)";
      changeFontColorCel.style.color = "rgba(7,7,7)";
      changeFontColorCity.style.color = "rgba(7,7,7)";
      changeColorDate.style.color = "rgba(7,7,7)";
      changeColorTime.style.color = "rgba(7,7,7)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.8";
    } else if (temp >= 10 && temp < 15) {
      body.style.backgroundImage = backgroundImageUrls["10-15"];
      changeFontColorTemp.style.color = "rgba(255,255,255)";
      changeColorDetails.style.color = "rgba(255,255,255)";
      changeFontColorDescr.style.color = "rgba(255,255,255)";
      changeFontColorCel.style.color = "rgba(255,255,255)";
      changeFontColorCity.style.color = "rgba(255,255,255)";
      changeColorDate.style.color = "rgba(255,255,255)";
      changeColorTime.style.color = "rgba(255,255,255)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.8";
    } else if (temp >= 15 && temp < 20) {
      body.style.backgroundImage = backgroundImageUrls["15-20"];
      setBackground.style.color = "rgba(7,7,7)";
      changeFontColorTemp.style.color = "rgba(7,7,7)";
      changeColorDetails.style.color = "rgba(7,7,7)";
      changeFontColorDescr.style.color = "rgba(7,7,7)";
      changeFontColorCel.style.color = "rgba(7,7,7)";
      changeFontColorCity.style.color = "rgba(7,7,7)";
      changeColorDate.style.color = "rgba(7,7,7)";
      changeColorTime.style.color = "rgba(7,7,7)";

      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.75";
    } else if (temp >= 20 && temp < 25) {
      body.style.backgroundImage = backgroundImageUrls["20-25"];
      setBackground.style.color = "rgba(7,7,7)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.8";
    } else if (temp >= 25 && temp < 30) {
      body.style.backgroundImage = backgroundImageUrls["25-30"];
      changeColorDetails.style.color = "rgba(255,255,255)";
      changeFontColorDescr.style.color = "rgba(255,255,255)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.8";
    } else if (temp >= 30) {
      body.style.backgroundImage = backgroundImageUrls["30+"];
      changeFontColorTemp.style.color = "rgba(7,7,7)";
      changeColorDetails.style.color = "rgba(7,7,7)";
      changeFontColorDescr.style.color = "rgba(7,7,7)";
      changeFontColorCel.style.color = "rgba(7,7,7)";
      changeFontColorCity.style.color = "rgba(7,7,7)";
      changeColorDate.style.color = "rgba(7,7,7)";
      changeColorTime.style.color = "rgba(7,7,7)";
      setBackground.style.backgroundSize = "cover";
      setBackground.style.opacity = "0.8";
    }
  }
  setBackgroundImage(temperature1);

  // function setBackgroundImage(temp) {
  //   if (temp < 0) {
  //     let slideshowImages = [
  //       "url(winter/1.jpg",
  //       "url(winter/2.jpg",
  //       "url(winter/3.jpg",
  //     ];
  //     displaySlideshow(slideshowImages);
  //   } else if (temp >= 0 && temp < 10) {
  //     let slideshowImages = [
  //       "url(spring/1.jpg",
  //       "url(spring/2.jpg",
  //       "url(spring/3.jpg",
  //     ];
  //     displaySlideshow(slideshowImages);
  //   }
  // }

  // function displaySlideshow(slideshowImages) {

  //   let slideshowContainer = document.querySelector("#app");

  //   for (let i = 0; i < slideshowImages.length; i++) {

  //     let image = document.createElement("img");
  //     image.src = slideshowImages[i];
  //     slideshowContainer.appendChild(image);
  //   }
  // }
  // setBackgroundImage(temperature1);
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
