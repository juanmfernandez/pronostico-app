import { useRef } from "react";
import { useNavigate } from 'react-router';

export function SearchForm(){
    const searchRef = useRef();
    const navigate = useNavigate();

    function handleSearchClick(){
        navigate(`/search?city=${searchRef.current.value}`)
    }

    return(
        <div className="form-container">
            <input className="input-search" ref={searchRef} placeholder="Ingrese nombre de una cuidad"></input>
            <button className="btn-search" onClick={handleSearchClick}>Buscar</button>
        </div>
    )
}