import React, { useState } from "react";
import './WeatherApp.css'

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png"



const WeatherApp = () => {

    let api_key = "5e0d79d511e1ab5f09cd6435c9e76dcb";

    const [wicon,setWicon] = useState(cloud_icon)

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value==="")
        {
            return alert("Please enter a location");

        }

        

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        if (response.status !== 200) {
            return alert("Location not found or invalid input. Please enter a valid location.");
            }

        const humidity =document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        
        humidity[0].innerHTML = data.main.humidity+ " %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+ " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+ " °c";
        location[0].innerHTML = data.name; 
        
        const wicon = {cloud_icon}

        switch (data.weather[0].icon) {
            case "01": case "01n":
                break;
            
            case "02d": case "012n":
                setWicon(cloud_icon)
                break;

            
            case "03d": case "03n": case "04d": case "04n":
                setWicon(drizzle_icon)
                break;
            
            case "09d": case "09n":
                setWicon(rain_icon)

            case "13d": case "13n":
                setWicon(snow_icon)
                break;
            
            default:
                setWicon(clear_icon)
            
        }

    }

    return (
    <div className="body">
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput"  placeholder="Search" />
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="Search icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="Weather" />
            </div>
            <div className="weather-temp">18°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity icon" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">79%</div>
                        <div className="text">Humidity</div>

                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind icon" className="icon" />
                    <div className="data">
                        <div className="wind-rate">19 km/h</div>
                        <div className="text">Wind Speed</div>

                    </div>
                </div>
            </div>


        </div>
    </div>
    ); 
    
}

export default WeatherApp