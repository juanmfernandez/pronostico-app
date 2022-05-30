import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: null,
    count: 0,
    text: "",
    usuarios: [],
    pokemones: []
}

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        incrementar: (state) => {
            return { ...state, count: state.count + 1 };
        },
        decrementar: (state) => {
            return { ...state, count: state.count - 1 };
        },
        setUsuarios: (state, action) => {
            return { ...state, usuarios: action.payload };
        },
        setPokemones: (state, action) => {
            return { ...state, pokemones: action.payload };
        },
    }
})

export const obtenerPokemonesAsync = () => async (dispatch) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemones  = await response.json();
    dispatch(countSlice.actions.setPokemones(pokemones))    
};
export const obtenerUsuariosAsync = () => async (dispatch) => {
    const response = await fetch('https://randomuser.me/api/');
    const usuarios = await response.json();
    dispatch(countSlice.actions.setUsuarios(usuarios))    
};

export const store = configureStore({
    reducer: countSlice.reducer
});
