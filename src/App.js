import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Child } from './Child';
import { countSlice, obtenerPokemonesAsync } from './store';
import "leaflet/dist/leaflet.css";
import { Map } from './components/Map';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';


function App() {
  const center = useSelector((state) => state.center);
  // const dispatch = useDispatch();

  // function handleAumentarClick(){
  //   dispatch( countSlice.actions.incrementar() )
  // }
  // function handlePokemonesClick(){
  //   dispatch( obtenerPokemonesAsync() )
  // }
  useEffect(() => {
    console.log(center)
  }, [center])
  
  return (
    <div className="App">
      <Child />
      <div className='map'>
        <Map />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
