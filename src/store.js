import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: null,
    text: "",
    center: [-27.471683177971855, -58.887607232352664],
    zoom: 13
}

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        setCenter: (state, action) => {
            return { ...state, center: action.payload };
        },
        setZoom: (state, action) => {
            return { ...state, zoom: action.payload };
        },
    }
})

// export const obtenerUsuariosAsync = () => async (dispatch) => {
//     const response = await fetch('https://randomuser.me/api/');
//     const usuarios = await response.json();
//     dispatch(countSlice.actions.setUsuarios(usuarios))    
// };

export const store = configureStore({
    reducer: countSlice.reducer
});
