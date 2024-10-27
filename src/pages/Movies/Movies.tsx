import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import Sorting from '@src/components/Sorting/Sorting';
import routes from '@src/constants/routes';
import sortOptions, { ISortOption } from '@src/constants/sortOptions';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  changeMoviesPage,
  changeMoviesSearch,
  changeMoviesSort,
  changeMoviesSortOrder,
  resetMoviesPage,
} from '@src/store/slices/searchSlice';
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from '@src/store/slices/userSlice';
import { IMoviesResponse } from '@src/types/serverAPITypes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Movies.module.scss';

const Movies = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movies, setMovies] = useState<IMoviesResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.movies);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getMovies(params);
      setMovies(data);
      setIsLoading(false);
    })();
  }, [params]);

  const isInFavorites = (id: number) => {
    if (favoritesMovies) {
      return favoritesMovies.some((movie) => movie.id === id);
    }
    return false;
  };

  const toggleFavorites = (id: number) => {
    if (isInFavorites(id)) {
      serverAPI.removeMovieToFavorites(id, succesRemove, unathorizedCallback);
    } else {
      serverAPI.addMovieToFavorites(id, succesAdd, unathorizedCallback);
    }
  };

  const succesAdd = (id: number) => {
    dispatch(addMovieToFavorites(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeMovieFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeMoviesSearch(search));
    dispatch(resetMoviesPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeMoviesPage(params.page + count));
  };

  const handleChangeSorting = (sortOption: ISortOption) => {
    dispatch(changeMoviesSort(sortOption.value.sortBy));
    dispatch(changeMoviesSortOrder(sortOption.value.sortOrder));
  };

  return (
    <section className={styles.movies_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search}
        />

        <Sorting
          sortOptions={sortOptions.movies}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Movies</h2>

        <Grid isLoading={isLoading}>
          {movies &&
            movies.data.map((movie) => (
              <Item
                key={movie.id}
                id={movie.id}
                handleBtnClickCallback={toggleFavorites}
                tittle={movie.tittle}
                subtittle={movie.genre}
                caption={new Date(movie.creationDate).getFullYear().toString()}
                imgUrl={movie.logoUrl}
                isActive={isInFavorites(movie.id)}
                navigateTo={`${routes.movies}/${movie.id}`}
              />
            ))}
        </Grid>

        {movies?.pagination && (
          <Pagination
            pagination={movies?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Movies;
