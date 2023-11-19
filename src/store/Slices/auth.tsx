import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { AuthState, UserType } from './types'

// Define the initial state using that type
const initialState: AuthState = {
    user: {
      id: '',
      name: '',
      surname: '',
      roles: []
    },
    token: '',
    expirationDate: ''
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<{ user: UserType; token: string, expirationDate: string}>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.expirationDate = action.payload.expirationDate;
    },
    authLogout: (state) => {
        state.user = {id: '', name: '', surname: '', roles: []};
        state.token = '';
        state.expirationDate = ''
    },
  },
})

export const { authLogin, authLogout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer