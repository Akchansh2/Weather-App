// script.js

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/weather/${city}`);
    const data = await res.json();

    if (res.status !== 200) {
      alert(data.error);
      return;
    }

    // display weather
    cityNameEl.innerText = data.name;
    temperatureEl.innerText = `🌡 Temperature: ${data.temp}°C`;
    descriptionEl.innerText = `☁ Weather: ${data.weather}`;
    humidityEl.innerText = `💧 Humidity: ${data.humidity}%`;
    windEl.innerText = `💨 Wind Speed: ${data.wind} m/s`;
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Check your server.");
  }
});