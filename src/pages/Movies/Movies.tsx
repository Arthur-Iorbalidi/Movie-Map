import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from '@src/store/slices/userSlice';
import { IMovie } from '@src/types/serverAPITypes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Movies.module.scss';

const Movies = () => {
  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movies, setMovies] = useState<IMovie[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const data = await serverAPI.getMovies();
      setMovies(data);
    })();
  }, []);

  const isInFavorites = (id: number) => {
    if (favoritesMovies) {
      return favoritesMovies.some((movie) => movie.id === id);
    }
    return false;
  };

  const toggleFavorites = (id: number) => {
    if (isInFavorites(id)) {
      dispatch(removeMovieFromFavorites(id));
    } else {
      dispatch(addMovieToFavorites(id));
    }
  };

  return (
    <section className={styles.movies_page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Movies</h2>

        <Grid isLoading={false}>
          {movies &&
            movies.map((movie) => (
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
      </div>
    </section>
  );
};

export default Movies;
