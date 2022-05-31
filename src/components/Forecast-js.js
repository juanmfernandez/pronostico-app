import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

export function Forecast(){
    const [ params ] = useSearchParams();
    const [cityCurrentWeather, setcityCurrentWeather] = useState([]);
    const [cityForecast, setCityForecast] = useState([]);
    const city = params.get("city");
    const lat = params.get("lat");
    const lon = params.get("lon");
    const apiKey = "8a5e9515a6583a0a93a8e614d848ffb5"

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&appid=${apiKey}&units=metric`)        
            .then(response => response.json())
            .then(data =>{ 
                setCityForecast( data );
                //console.log("cityForecast: " + JSON.stringify(data))
            })
            .catch(e => console.log("Error: " + e))
    }, []);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${apiKey}&units=metric`)        
            .then(response => response.json())
            .then(data =>{ 
                setcityCurrentWeather( data );
                console.log("cityCurrentWeather: " + JSON.stringify(data))
            })
            .catch(e => console.log("Error: " + e))
    }, []);

    return(
        <div>
            City: {city}
            {cityForecast.list != null &&
                        cityForecast.list.map((forecast, i) => {
                            return(
                                        <div key={i} className="poke">
                                                <div className="card">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">{i} Dt: {forecast.dt} </li>
                                                        <li className="list-group-item">Temp: {forecast.main.temp} °C </li>
                                                        <li className="list-group-item">Sensación térmica: {forecast.main.feels_like} °C </li>
                                                        <li className="list-group-item">Presión: {forecast.main.pressure} hPa </li>
                                                        <li className="list-group-item">Humedad: {forecast.main.humidity} % </li>
                                                        <li className="list-group-item">Desc: {forecast.weather[0].description} </li>
                                                        <li className="list-group-item">dt_txt: {forecast.dt_txt} </li>
                                                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
                                                    </ul>
                                                </div>
                                        </div>
                            )
                        })
            }
        </div>
    )
}