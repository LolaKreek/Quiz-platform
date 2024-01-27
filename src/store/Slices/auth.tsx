import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { AuthState, UserType } from "./types";
import { deleteUserLocalData, setUserLocalData } from "../userLocalStorage";
import { signOut } from "firebase/auth";
import { auth, database } from "../../services/Firebase/firebase";
import { get, ref, set } from "@firebase/database";

// Define the initial state using that type
const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    email: "",
    emailVerified: false,
    isAnonymous: false,
    phone: "",
    photoURL: "",
    role: "",
  },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authLogin: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>
    ) => {
      setUserLocalData({
        user: action.payload.user,
        token: action.payload.token,
      });
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    authLogout: (state) => {
      deleteUserLocalData();
      signOut(auth);
      state.user = {
        id: "",
        name: "",
        email: "",
        emailVerified: false,
        isAnonymous: false,
        phone: "",
        photoURL: "",
        role: "",
      };
      state.token = "";
    },
    tokenLogin: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
      get(ref(database, `users/${auth.currentUser?.uid}`)).then((snapshot) => {
        set(ref(database, `users/${auth.currentUser?.uid}`), {...snapshot.val(), ...action.payload.user});
      })
    },
  },
});

export const { authLogin, authLogout, tokenLogin, updateUser } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.auth.user.id;

export default authSlice.reducer;
