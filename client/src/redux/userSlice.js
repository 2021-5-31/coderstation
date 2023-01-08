import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserInfoApi } from '../api/user'

export const updateUserInfoAsync = createAsyncThunk(
  'user/updateUserInfoAsync',
  async (payload, thunkApi) => {
    await updateUserInfoApi(payload.userId, payload.newUserInfo)
    thunkApi.dispatch(updateUserInfo(payload.newUserInfo))
  }
)
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
    updateUserInfo(state, { payload }) {
      for (const key in payload) {
        state.userInfo[key] = payload[key]
      }
    },
    updateLoginStatus(state, { payload }) {
      state.isLogin = payload
    },
    clearUserInfo(state, { payload }) {
      state.userInfo = {}
    }
  }
})
export const { initUserInfo, updateUserInfo, updateLoginStatus, clearUserInfo } = userSlice.actions
export default userSlice.reducer