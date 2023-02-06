/* eslint-disable no-unused-vars */
import "./weatherApp.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API KEY AND URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const currentLocationAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=mangalore&units=metric&appid=895284fb2d2c50a520ea537456963d9c";
  // const currentLocationAPI = axios
  //   .get("https://ip-api.io/json")
  //   .then((response) => setLocation(response.data.city));

  useEffect(() => {
    axios.get(currentLocationAPI).then((response) => {
      setData(response.data);
      setWeatherIcon(
        `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
      );
      setLoading(false);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setWeatherIcon(
          `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
        );
        console.log(response.data);
      })
      .catch(() => setError("Invalid Location Name"));
    setLocation("");
  };

  return (
    <div className="app">
      <div className="input-container">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />{" "}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && (
        <div className="container__error">
          <p>{` Error: ${error} `}</p>
        </div>
      )}
      <div className="container">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="container__temperature">
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>

        <div className="container__weather-icon">
          {weatherIcon && <img src={weatherIcon} alt="weather"></img>}
        </div>

        <div className="container__humidity-wind">
          {data.main ? (
            <div className="humidity">
              <p>Humidity</p>
              <p className="bold">{data.main.humidity}%</p>
            </div>
          ) : null}
          {data.wind ? (
            <div className="wind">
              <p>Wind Speed</p>
              <p className="bold">{data.wind.speed.toFixed()} MPH</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
