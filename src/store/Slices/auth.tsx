import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { AuthState, UserType } from './types'

// Define the initial state using that type
const initialState: AuthState = {
    user: {
      id: '',
      name: '',
      email: '',
      emailVerified: false,
      isAnonymous: false,
      phoneNumber: '',
      photoURL: '',
      roles: []
    },
    token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<{ user: UserType; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    authLogout: (state) => {
        state.user = {
          id: '',
          name: '',
          email: '',
          emailVerified: false,
          isAnonymous: false,
          phoneNumber: '',
          photoURL: '',
          roles: []
        };
        state.token = '';
    },
  },
})

export const { authLogin, authLogout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserId = (state: RootState) => state.auth.user.id

export default authSlice.reducer