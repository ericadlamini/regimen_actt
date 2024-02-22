import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city.."
        onChange={updateCity}
        className="search-form-input"
      />
      <button type="Submit" className="search-form-button">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div className="App">
        {form}
        <ul>
          <li className="temperature">{Math.round(weather.temperature)}°C</li>
          <li className="city">in {city}</li>
          <li>Conditions: {weather.description}</li>
          <li>
            Humidity: <span className="details">{weather.humidity}%</span>
          </li>
          <li>
            Wind: <span className="details">{weather.wind}km/h</span>
          </li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
        <div className="footer">
          This app was Coded by{" "}
          <a
            href="https://github.com/ericadlamini"
            target="blank"
            rel="noreferrer"
          >
            Erica Dlamini
          </a>{" "}
          and is open-sourced on{" "}
          <a
            href="https://github.com/ericadlamini/regimen_actt"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://react-git-net-ed.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            Netlify
          </a>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
