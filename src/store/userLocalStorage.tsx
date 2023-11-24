import { AuthState } from "./Slices/types";

const appName = 'quiz'

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