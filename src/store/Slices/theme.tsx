import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ThemeState } from "./types";
import { setTheme } from "../userLocalStorage";

// Define the initial state using that type
const initialState: ThemeState = {
    theme: 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeState>) => {
      setTheme({theme: action.payload.theme})
      state.theme = action.payload.theme;
    },
  },
})

export const { changeTheme } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectThemeStatus = (state: RootState) => state.theme.theme

export default themeSlice.reducer