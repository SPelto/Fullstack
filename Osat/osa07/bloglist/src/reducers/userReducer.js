import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, token: null },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      return state
    },
    logout(state, action) {
      state.user = null
      state.token = null
      return state
    },
    setCredentials(state, action) {
      state.token = action.payload.token
      state.user = action.payload.username
      return state
    },
    test(state, action) {
      console.log(state.token)
    }
  }
})

export const login = (user) => {
  return async dispatch => {
    const response = await loginService.login(user)
    dispatch(loginUser(response.data))
  }
}
export const selectUser = (state) => state.user
export const selectToken = (state) => state.token

export const { loginUser, setCredentials, test } = userSlice.actions
export default userSlice.reducer