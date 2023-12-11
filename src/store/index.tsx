import { configureStore } from "@reduxjs/toolkit";
import auth from './Slices/auth';
import notification from "./Slices/notification";
import theme from "./Slices/theme";

export const store = configureStore({
    reducer: {
        auth,
        notification,
        theme
    },
    devTools: import.meta.env.NODE_ENV != 'production'
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch