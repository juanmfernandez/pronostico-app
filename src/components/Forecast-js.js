import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import '../custom.css'

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
            })
            .catch(e => console.log("Error: " + e))
    }, [lat, lon]);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${apiKey}&units=metric`)        
            .then(response => response.json())
            .then(data =>{ 
                setcityCurrentWeather( data );
                console.log("cityCurrentWeather: " + JSON.stringify(data))
            })
            .catch(e => console.log("Error: " + e))
    }, [lat, lon]);

    return(
        <div>
            {cityCurrentWeather.weather != null &&
                /* card estado actual */
               <div className="wht-container-current">
                    <div className="top">
                        <div>
                            <h2 className="current-city">{cityCurrentWeather.name}</h2>
                            <p className="current-description">{cityCurrentWeather.weather[0].description}</p>                            
                        </div>
                        <img src={`http://openweathermap.org/img/wn/${cityCurrentWeather.weather[0].icon}@2x.png`} />
                    </div>
                    <div className="medium">
                        <div className="temp">{cityCurrentWeather.main.temp} °C</div>
                        <div className="details">
                            <p>{cityCurrentWeather.main.feels_like} °C</p>
                            <p>{cityCurrentWeather.main.humidity} %</p>
                            <p>{cityCurrentWeather.main.pressure} hPa</p>
                        </div>
                    </div>
                    <div className="bottom">Estado actual</div>
                </div>                        
            }
            {cityForecast.list != null &&
                        cityForecast.list.map((forecast, i) => {
                            return(
                                /* cards pronostico */
                                <>
                                    <div key={i} className="wht-container">
                                        <div className="top">
                                            <div>
                                                <h2 className="current-city">{cityCurrentWeather.name}</h2>
                                                <p className="current-description">{forecast.weather[0].description}</p>                            
                                            </div>
                                            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
                                        </div>
                                        <div className="medium">
                                            <div className="temp">{forecast.main.temp} °C</div>
                                            <div className="details">
                                                <p>{forecast.main.feels_like} °C</p>
                                                <p>{forecast.main.pressure} hPa</p>
                                                <p>{forecast.main.humidity} % </p>
                                            </div>
                                        </div>
                                        <div className="bottom">{forecast.dt_txt}</div>
                                    </div>   
                                </>
                            )
                        })
            }
        </div>
    )
}