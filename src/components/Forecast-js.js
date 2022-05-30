import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';

export function Forecast(){
    const [ params ] = useSearchParams();
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
                console.log("data: " + JSON.stringify(data))
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
                                                        <li className="list-group-item">Dt: {forecast.dt} </li>
                                                        <li className="list-group-item">temp: {forecast.main.temp}  </li>
                                                        <li className="list-group-item">Desc: {forecast.weather[0].description} </li>
                                                        <li className="list-group-item">dt_txt: {forecast.dt_txt} </li>
                                                    </ul>
                                                </div>
                                        </div>
                            )
                        })
            }
        </div>
    )
}