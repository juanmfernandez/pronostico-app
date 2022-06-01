import { useRef } from "react";
import { useNavigate } from 'react-router';
import { useSelector } from "react-redux"

export function Child(){
    const searchRef = useRef();
    const text = useSelector((state) => state.text);
    const pokemones = useSelector((state) => state.pokemones);
    const navigate = useNavigate();

    function handleSearchClick(){
        navigate(`/search?city=${searchRef.current.value}`)
    }

    return(
        <div className="form-container">
            <input className="input-search" type={text} ref={searchRef} placeholder="Ingrese nombre de una cuidad"></input>
            <button className="btn-search" onClick={handleSearchClick}>Buscar</button>
        </div>
    )
}