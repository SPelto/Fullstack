import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    message(state, action) {
      console.log(action.payload)
      return action.payload
    }
  },
})

export const { message } = notificationSlice.actions
export default notificationSlice.reducer