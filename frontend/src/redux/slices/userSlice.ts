import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '@models/interfaces';
import { RootState } from '..';

type InitialState = {
  isAuth: boolean;
  user: User | null;
};

const initialState: InitialState = {
  isAuth: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = initialState.isAuth;
      state.user = initialState.user;

      localStorage.removeItem('user');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;

      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export default authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
