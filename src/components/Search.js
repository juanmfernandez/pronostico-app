import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { countSlice } from "../store";

export function Search(){
    const [ params ] = useSearchParams();
    const [cities, setCities] = useState([]);
    const current_city = params.get("city");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${current_city}&limit=5&appid=8a5e9515a6583a0a93a8e614d848ffb5`)
            .then(response => response.json())
            .then(data =>{ 
                setCities( data );
                console.log("data: " + JSON.stringify(data))
            })
            .catch(e => console.log("Error: " + e))
    }, [current_city]);

    function handleSetCenter(lat, lon){
        dispatch( countSlice.actions.setCenter([lat, lon]) )
    }

    function handleSearchForecastClick(lat, lon, city){
        navigate(`/forecast?lat=${lat}&lon=${lon}&city=${city}`);
        handleSetCenter(lat, lon);
    }

    return(
        <div>
            City: {current_city}
            {cities != null &&
                        cities.map((city, i) => {
                            return(
                                        <div key={i} className="poke">
                                            {/* <Link to={`/pokemon/${img}`}> */}
                                                <div className="card">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">Cuidad: {city.name} </li>
                                                        <li className="list-group-item">Coordenadas: {city.lat} / {city.lon} </li>
                                                        <li className="list-group-item">Pais: {city.country} </li>
                                                        <li className="list-group-item">Estado/Provincia: {city.state} </li>
                                                        <button onClick={() => {handleSearchForecastClick(`${city.lat}`, `${city.lon}`, `${city.name}`)}}>Ver pronóstico</button>
                                                    </ul>
                                                </div>
                                            {/* </Link>  */}
                                        </div>
                            )
                        })
                        }

        </div>
    )
}