import { configureStore } from "@reduxjs/toolkit";
// import auth from '../features/auth/slices';

export const store = configureStore({
    reducer: {
        // auth
    },
    devTools: import.meta.env.NODE_ENV != 'production'
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch