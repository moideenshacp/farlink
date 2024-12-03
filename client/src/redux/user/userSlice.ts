import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type
interface User {
  name: string;
  email: string;
  role:"admin" | "superAdmin" | "employee"

}

// Define the initial state type
interface userState {
  user: User | null;
  isAuthenticated: boolean;
  token:string | null
}

// Initial state
const initialState: userState = {
  user: null,
  isAuthenticated: false,
  token:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User ,token:string }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token; 
    },
    logout(state) {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
