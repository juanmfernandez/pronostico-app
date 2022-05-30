import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react';
import App from './App';
import { store } from './store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Search } from "./components/Search";
import { Forecast } from "./components/Forecast-js";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>        
          <Route path="/" element={ <App /> }></Route> 
          <Route path="/search" element={ <Search /> }></Route>
          <Route path="/forecast" element={ <Forecast /> }></Route>
        </Routes>
      </BrowserRouter>
    </Provider> 
  </StrictMode>
);