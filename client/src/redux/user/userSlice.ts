import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  role: "admin" | "superAdmin" | "employee";
  isOrganizationAdded: boolean
  organizationId?: string;
}

// Define the initial state type
interface userState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Initial state
const initialState: userState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.clear()
    },
    toggleOrganizationStatus(state) {
      if (state.user) {
        state.user.isOrganizationAdded = !state.user.isOrganizationAdded;
      }
    },
    setOrganizationId(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.organizationId = action.payload;
      }
    },
  },
});

export const { login, logout ,toggleOrganizationStatus,setOrganizationId} = userSlice.actions;
export default userSlice.reducer;
