import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthorized: false,
    userInfo: undefined,
  },
  reducers: {
    changeIsAuthorized: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAuthorized: action.payload,
    }),
    changeUserInfo: (state, action) => ({
      ...state,
      userInfo: action.payload,
    }),
  },
});

export const { changeIsAuthorized, changeUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
