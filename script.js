const apikey = "5c7aff260fb878c039779d734b27d43e";
const searchbox = document.querySelector(".search input");
const searchbutton = document.querySelector(".search button");
const weathericon = document.querySelector(".weathericon");

async function checkweather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`
  );
  const data = await response.json();

  console.log(data);

  if (data.cod === "404") {
    document.querySelector(".city").textContent = "City not found";
    document.querySelector(".temp").textContent = "-";
    document.querySelector(".humidity").textContent = "-";
    document.querySelector(".wind").textContent = "-";
  } else {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp_max) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " Km/h";

    const condition = data.weather[0].main;
    if (condition === "Clouds") {
      weathericon.src = "clouds.png";
    } else if (condition === "Clear") {
      weathericon.src = "clear.png";
    } else if (condition === "Rain") {
      weathericon.src = "rain.png";
    } else if (condition === "Drizzle") {
      weathericon.src = "drizzle.png";
    } else if (condition === "Snow") {
      weathericon.src = "snow.png";
    } else if (condition === "Mist" || condition === "Haze") {
      weathericon.src = "mist.png";
    }
  }
}

checkweather("Islamabad");

searchbutton.addEventListener("click", () => {
  const city = searchbox.value.trim();
  if (city !== "") {
    checkweather(city);
  }
});
