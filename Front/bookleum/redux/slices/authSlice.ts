import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin(state) {
      state.isLoggedIn = true;
    },
    userLogout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
