import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultSearchValues from '@src/constants/defaultSearchValues';

const searchSlice = createSlice({
  name: 'search',
  initialState: defaultSearchValues,
  reducers: {
    changeMoviesSearch: (state, action: PayloadAction<string>) => {
      state.movies.search = action.payload;
    },
    changeMoviesPage: (state, action: PayloadAction<number>) => {
      state.movies.page = action.payload;
    },
    changeMoviesSort: (state, action: PayloadAction<string>) => {
      state.movies.sortBy = action.payload;
    },
    changeMoviesSortOrder: (state, action: PayloadAction<string>) => {
      state.movies.sortOrder = action.payload;
    },
    resetMoviesPage: (state) => {
      state.movies.page = defaultSearchValues.movies.page;
    },
    changeActorSearch: (state, action: PayloadAction<string>) => {
      state.actors.search = action.payload;
    },
    changeActorPage: (state, action: PayloadAction<number>) => {
      state.actors.page = action.payload;
    },
    changeActorSort: (state, action: PayloadAction<string>) => {
      state.actors.sortBy = action.payload;
    },
    changeActorSortOrder: (state, action: PayloadAction<string>) => {
      state.actors.sortOrder = action.payload;
    },
    resetActorPage: (state) => {
      state.actors.page = defaultSearchValues.actors.page;
    },
    changeDirectorSearch: (state, action: PayloadAction<string>) => {
      state.directors.search = action.payload;
    },
    changeDirectorPage: (state, action: PayloadAction<number>) => {
      state.directors.page = action.payload;
    },
    changeDirectorSort: (state, action: PayloadAction<string>) => {
      state.directors.sortBy = action.payload;
    },
    changeDirectorSortOrder: (state, action: PayloadAction<string>) => {
      state.directors.sortOrder = action.payload;
    },
    resetDirectorPage: (state) => {
      state.directors.page = defaultSearchValues.directors.page;
    },
  },
});

export const {
  changeActorPage,
  changeActorSearch,
  changeActorSort,
  changeActorSortOrder,
  changeDirectorPage,
  changeDirectorSearch,
  changeDirectorSort,
  changeDirectorSortOrder,
  changeMoviesPage,
  changeMoviesSearch,
  changeMoviesSort,
  changeMoviesSortOrder,
  resetActorPage,
  resetDirectorPage,
  resetMoviesPage,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
