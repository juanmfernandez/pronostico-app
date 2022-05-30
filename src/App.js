import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Child } from './Child';
import { countSlice, obtenerPokemonesAsync } from './store';
import "leaflet/dist/leaflet.css";
import { Map } from './components/Map';

function App() {
  // const count = useSelector((state) => state.count);
  // const dispatch = useDispatch();

  // function handleAumentarClick(){
  //   dispatch( countSlice.actions.incrementar() )
  // }
  // function handlePokemonesClick(){
  //   dispatch( obtenerPokemonesAsync() )
  // }
  
  return (
    <div className="App">
      <Child />
      <div className='map'>
        <Map />
      </div>
    </div>
  );
}

export default App;
