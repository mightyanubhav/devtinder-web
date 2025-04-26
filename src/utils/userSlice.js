import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // initially no user
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // save user object
    },
    clearUser: (state) => {
      state.user = null; // for logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;