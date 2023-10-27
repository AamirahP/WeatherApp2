import React, { useState, useEffect } from "react";
import './WeatherApp.css'

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";

const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloud_icon);
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState({});

    const search = async () => {
        if (city === "") {
            return; // Do nothing if the input field is empty
        }

        try {
            const response = await fetch(`/api/weather?city=${city}`);
            if (response.status === 200) {
                const data = await response.json();
                setWeatherData(data);
                updateWeatherIcon();
            } else {
                alert("Location not found or invalid input. Please enter a valid location.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while fetching data.");
        }
    }

    const updateWeatherIcon = () => {
        if (weatherData && weatherData.main && weatherData.main.temp !== undefined) {
            switch (weatherData.weather[0].icon) {
                case "01":
                case "01n":
                    break;
                case "02d":
                case "012n":
                    setWicon(cloud_icon);
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    setWicon(drizzle_icon);
                    break;
                case "09d":
                case "09n":
                    setWicon(rain_icon);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow_icon);
                    break;
                default:
                    setWicon(clear_icon);
            }
        }
    }

    useEffect(() => {
        updateWeatherIcon();
    }, [weatherData]);

    useEffect(() => {
        // Fetch data for the default city when the component mounts
        search();
    }, []);

    return (
        <div className="body">
            <div className="container">
                <div className="top-bar">
                    <input
                        type="text"
                        className="cityInput"
                        placeholder="Search"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <div className="search-icon" onClick={search}>
                        <img src={search_icon} alt="Search icon" />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={wicon} alt="Weather" />
                </div>
                {weatherData && weatherData.main && (
                    <div>
                        <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
                        <div className="weather-location">{weatherData.name}</div>
                    </div>
                )}
                {weatherData && weatherData.main && (
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="humidity icon" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} alt="wind icon" className="icon" />
                            <div className="data">
                                <div className="wind-rate">{Math.round(weatherData.wind.speed)} km/h</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherApp;
