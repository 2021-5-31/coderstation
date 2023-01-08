import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTypeListApi } from '../api/type'

export const getTypeList = createAsyncThunk(
  'type/getTypeList',
  async (_, thunkAPI) => {
    const res = await getTypeListApi()
    if (res.code === 0) {
      return res.data
    }
  }
)
export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    typeList: [],
    typeId: 'all'
  },
  reducers: {
    updateTypeId: (state, { payload }) => {
      state.typeId = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, action) => {
      state.typeList = action.payload
    })
  },
})
export const { updateTypeId } = typeSlice.actions
export default typeSlice.reducer