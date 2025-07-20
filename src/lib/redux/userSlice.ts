
import { createSlice } from '@reduxjs/toolkit'



const themeSlice = createSlice({
  name: "user",
  initialState: {
    username: "Iroka09",
    password: "1234",
  },
  reducers: {
    changeUsername(state, { payload }) {
      state.username = payload
    },
    changePassword(state, { payload }) {
      state.password = payload
    },
  }
})


export const { changeUsername, changePassword } = themeSlice.actions
export default themeSlice.reducer