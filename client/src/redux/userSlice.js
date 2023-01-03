import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {}
  },
  reducers: {
    initUserInfo(state, { payload }) {
      state.userInfo = payload
    },
    updateLoginStatus(state, { payload }) {
      state.isLogin = payload
    },
    clearUserInfo(state, { payload }) {
      state.userInfo = {}
    }
  }
})
export const { initUserInfo, updateLoginStatus, clearUserInfo } = userSlice.actions
export default userSlice.reducer