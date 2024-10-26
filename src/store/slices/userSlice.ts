import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@src/types/serverAPITypes';

interface UserState {
  isAuthorized: boolean;
  userInfo?: IUser;
}

const initialState: UserState = {
  isAuthorized: false,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },

    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    removeMovieFromFavorites: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.movies = state.userInfo.movies.filter(
          (movie) => movie.id !== action.payload,
        );
      }
    },

    removeActorFromFavorites: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.actors = state.userInfo.actors.filter(
          (actor) => actor.id !== action.payload,
        );
      }
    },

    removeDirectorFromFavorites: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.directors = state.userInfo.directors.filter(
          (director) => director.id !== action.payload,
        );
      }
    },

    addMovieToFavorites: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.movies.some((movie) => movie.id === action.payload)
      ) {
        state.userInfo.movies.push({ id: action.payload });
      }
    },

    addActorToFavorites: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.actors.some((actor) => actor.id === action.payload)
      ) {
        state.userInfo.actors.push({ id: action.payload });
      }
    },

    addDirectorToFavorites: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.directors.some(
          (director) => director.id === action.payload,
        )
      ) {
        state.userInfo.directors.push({ id: action.payload });
      }
    },
  },
});

export const {
  changeIsAuthorized,
  changeUserInfo,
  removeActorFromFavorites,
  removeDirectorFromFavorites,
  removeMovieFromFavorites,
  addActorToFavorites,
  addDirectorToFavorites,
  addMovieToFavorites,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
