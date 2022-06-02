import { useSelector } from 'react-redux';
import './App.css';
import { SearchForm } from './components/searchForm';
import "leaflet/dist/leaflet.css";
import { Map } from './components/Map';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const center = useSelector((state) => state.center);

  useEffect(() => {
    console.log(center)
  }, [center])
  
  return (
    <div className="App">
      <SearchForm />
      <div className='map'>
        <Map />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
