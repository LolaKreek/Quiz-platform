import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { NotificationState } from "./types";

// Define the initial state using that type
const initialState: NotificationState = {
    header: '',
    message: '',
    status: false,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationState>) => {
        state.header = action.payload.header;
        state.message = action.payload.message;
        state.status = true;
    },
    deleteNotification: (state) => {
        state.header = '';
        state.message = '';
        state.status = false;
    },
  },
})

export const { addNotification, deleteNotification } = notificationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNotificationStatus = (state: RootState) => state.notification.status

export default notificationSlice.reducer