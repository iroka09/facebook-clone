
import { createSlice } from '@reduxjs/toolkit'



const themeSlice = createSlice({
  name: "user",
  initialState: {
    data: null
  },
  reducers: {
    setUser(state, { payload }) {
      state.data = payload
    }
  }
})


export const { setUser } = themeSlice.actions
export default themeSlice.reducer