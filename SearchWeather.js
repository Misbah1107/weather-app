import React from 'react'
import { useState } from 'react';

const api = {
   // key: "ac493437e70d422b8f8af6570273da64",
   // base: "https://openweathermap.org/api/data/2.5/"
   key : "70eefff73d1dfcf0e9ca4bfb45c3c9d2",
   base: "http://api.openweathermap.org/data/2.5/"
}
function SearchWeather() {

    const [query, setQuery]= useState('');
    const [weather, setWeather]= useState('');

    const search = e => {
        if (e.key === "Enter"){
            fetch(`${api.base} weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
            setWeather(result)
            setQuery('');
            
        });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January","February","March","April","May","June","July",
    "August","September","Octuber","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year =d.getFullYear();
     return `${day} ${date} ${month} ${year}`
}
    return (
        <div className ={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm " : "app" ) : "app" } >

            <input
            type = "text"
            placeholder = "Search"
            onChange = {e => setQuery(e.target.value)}
            value = {query}
            onKeyPress ={search}
            />
            {(typeof weather.main != "undefined") ? (
            <div>
            <div className = "location" > {weather.name}, {weather.sys.country} </div>
            <div className = "date" > {dateBuilder(new Date())} </div>
            <div className = "weather-box" >
                <div> {api.icon} </div>
                <div className = "temp" >
                    {Math.round(weather.main.temp)}c
                </div>
                <div className = "weather" > {weather.weather[0].main}</div>
            </div>
            </div>
            ) : ('') }
        </div>
    )
}

export default SearchWeather
