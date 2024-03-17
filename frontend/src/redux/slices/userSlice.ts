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
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = payload;

      localStorage.setItem('userId', payload.id.toString());
    },
  },
});

export default authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
