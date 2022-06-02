import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let center = [-27.471683177971855, -58.887607232352664];
let zoom = 13;

function DisplayPosition({ map }) {
  center = useSelector((state) => state.center);
  zoom = useSelector((state) => state.zoom);
  const [position, setPosition] = useState(() => map.getCenter())
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  useEffect(() => {
    onClick()
  }, [center])

  function handleSearchForecastClick(lat, lon, city){
    navigate(`/forecast?lat=${position.lat.toFixed(4)}&lon=${position.lng.toFixed(4)}`)
  }

  return (
    <p>
      Coordenadas: lat: {position.lat.toFixed(4)}, long: {position.lng.toFixed(4)}{' '}
      <button onClick={handleSearchForecastClick}>Buscar pronóstico aquí</button>
    </p>
  )
}

export function Map() {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  )

  return (
    <div className="map">
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  )
}