import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
  isAuthenticated: boolean;
  user: Object | null;
  username?: string | null;
  email?: string | null;
  token?: string | null;
}

interface LoginPayload {
  token: string;
  email: string;
  user: {
    firstname: string;
    lastname: string;
  }
}

interface TokenPayload {
  username: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserSliceState = {
  isAuthenticated: false,
  user: null,
  username: "",
  email: "",
  token: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { user, token, email } = action.payload;
      const username: string = `${user.firstname} ${user.lastname}`;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

      state.isAuthenticated = true;
      state.user = user;
      state.username = username;
      state.token = token;
    },
    setToken: (state, action: PayloadAction<TokenPayload>) => {
      const { email, token, username } = action.payload;

      state.token = token;
      state.username = username;
      state.email = email;
      state.isAuthenticated = true;
    },
    setProfile: (state, payload) => {
      state.user = payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      state.user = null;
      state.token = null;
      state.username = "";
      state.isAuthenticated = false;
    }
  }
});

export const { login, setToken, logout, setProfile } = userSlice.actions;

