import { AuthState, ThemeState } from "./Slices/types";

const appName = 'quiz';
const themeName = 'theme'

export const getUserLocalData = () => {
  // @ts-ignore
  return JSON.parse(localStorage?.getItem(appName));
}

export const setUserLocalData = (player:AuthState) => {
  localStorage.setItem(appName, JSON.stringify(player));
}

export const deleteUserLocalData = () => {
  localStorage.removeItem(appName);
}

export const setTheme = (player:ThemeState) => {
  localStorage.setItem(themeName, JSON.stringify(player));
}

export const getTheme = () => {
  // @ts-ignore
  return JSON.parse(localStorage?.getItem(themeName));
}