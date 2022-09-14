import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Notifications are working'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return initialState
    }
  },
})

export const { notification } = notificationSlice.actions
export default notificationSlice.reducer