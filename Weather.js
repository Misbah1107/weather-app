import React from 'react'
import "../App.css"
import background from "./image/background.mp4"
import { useState } from 'react';

const api = {
   // key: "ac493437e70d422b8f8af6570273da64",
   // base: "https://openweathermap.org/api/data/2.5/"
   key : "70eefff73d1dfcf0e9ca4bfb45c3c9d2",
   base: "http://api.openweathermap.org/data/2.5/",

   

}


function Weather() {
    const [query, setQuery]= useState('Karachi');
    const [weather, setWeather]= useState('');

    const search = e => {
        if (e.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&appid=${api.key} `   )
            .then(res => res.json())
            .then(result => {
            setWeather(result)
            setQuery('');
            console.log(result)
            
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
     let dat = new Date()
     let houre = dat.getHours();
     let min = dat.getMinutes();

     return `${day} ${date} ${month} ${year}  `
}
// const weatherIcon = `http://openweathermap.org/img/wn/` + `${weather.weather.icon}` + ".png"

    return (
        <div className ={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm " : "app" ) : "app" }>
            {/* <div className ={(typeof weather.weather != "undefined") ? ((weather.weather.icon ) ? "app icon " : "app" ) : "app" }> <div> <img src = {weatherIcon} /> </div></div> */}
            <main className= "weather_app" >
                <div>
                    <video className="video" src={background} autoPlay muted loop></video>
                    <input
                        className="search "
                        type = "text"
                        placeholder = "Search"
                        onChange = {e => setQuery(e.target.value)}
                        value = {query}
                        onKeyPress ={search}
                        

                    />
                    <button   onClick = {search}> <i className="fas fa-search"  ></i></button>
                </div>
                {(typeof weather.main != "undefined") ? (
                <div className = "weather">
                    <section className="location">
                        <div className="city" >{weather.name}, {weather.sys.country}</div>
                        <div className="date" >{dateBuilder(new Date())}</div>
                    </section>
                    <div className="current" >
                    <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} width = "15%" alt = "weather icon" />
                        <div className="temp" >    {Math.floor(weather.main.temp - 273.15)}<span>°C</span> </div>
                        <div className="weather" >{weather.weather[0].main}</div>
                        
                        <div className="hi-low" >{Math.floor(weather.main.temp_min - 273.15)}&deg;C / {Math.floor(weather.main.temp_max - 273.15)}&deg;C</div>
                        
                    </div>

                </div>
                ) : ('') }
            </main>


        </div>
    )
    
}

export default Weather
