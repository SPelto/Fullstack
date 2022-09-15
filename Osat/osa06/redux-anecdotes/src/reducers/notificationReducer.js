import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state,action) {
      return null
    }
  }
})

export const updateNotification = (message,visibleFor) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, visibleFor)
  }
}
export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer