import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ROLE from '@models/enums';
import { RootState } from '..';

type User = {
  name: string;
  role: ROLE;
};

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
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
