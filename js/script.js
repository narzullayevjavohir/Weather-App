let API_KEY = "aba8a750c74444eab4494938231602";

const weather = document.querySelector(".weather");
const form = document.querySelector("form");
const formInput = form.querySelector("input");
const formBtn = form.querySelector("button");

// Box element
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const weatherTemp = document.querySelector(".temp");
const imgBx = document.querySelector(".imgBx");

const getWeather = async () => {
  let valueInput = formInput.value.trim();
  if (!valueInput.length) return;
  const getLink = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${valueInput}&aqi=no`;
  const request = await fetch(getLink);
  const data = await request.json();
  if (valueInput.length === 0) return;
  return data ? data : null;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather()
    .then((data) => {
      if (data) {
        setData(data);
        weather.classList.add("active");
      }
    })
    .catch((err) => (err ? alert("Not found country") : alert("Hello")));
  form.reset();
});

function setData(data) {
  city.innerHTML = data.location.name;
  country.innerHTML = data.location.country;
  weatherTemp.innerHTML = `${Math.floor(data.current.temp_c)}&#176;C`;
  imgBx.src = data.current.condition.icon;
}
