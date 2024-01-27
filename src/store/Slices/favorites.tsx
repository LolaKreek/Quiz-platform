import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { FavoriteUserType, FavoritesState } from "./types";
import { ref, set } from "firebase/database";
import { auth, database } from "../../services/Firebase/firebase";
// Define the initial state using that type
const initialState: FavoritesState = {
  users: [],
  subjects: [],
  quizes: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: ( state, action: PayloadAction<{ value: string | FavoriteUserType, type: "users" | "subjects" | "quizes" }> ) => {
        // @ts-ignore   
        state[action.payload.type] = state[action.payload.type].includes(action.payload.value) ? state[action.payload.type] : [...state[action.payload.type], action.payload.value]
        set(ref(database, `users/${auth.currentUser?.uid}/favorites/${action.payload.type}`), state[action.payload.type]);
    },
    removeFavorite: ( state, action: PayloadAction<{ value: string | FavoriteUserType, type: "users" | "subjects" | "quizes" }> ) => {
        // @ts-ignore 
        state[action.payload.type] = state[action.payload.type].filter((el) => {
          return el !== action.payload.value
        })
        set(ref(database, `users/${auth.currentUser?.uid}/favorites/${action.payload.type}`), state[action.payload.type]);
    },
    setFavorites: ( state, action: PayloadAction<{ value: FavoritesState }> ) => {
        state.quizes = action.payload.value.quizes ? action.payload.value.quizes : []
        state.subjects = action.payload.value.subjects ? action.payload.value.subjects : []
        state.users = action.payload.value.users ? action.payload.value.users : []
    },
    
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
