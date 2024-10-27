import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import { removeMovieFromFavorites } from '@src/store/slices/userSlice';
import { IMovie } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteMovie } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid from '../Grid/Grid';
import Item from '../Item/Item';

const FavoritesMovies = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movies, setMovies] = useState<IMovie[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFavoriteMovies();
      setMovies(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorites = (id: number) => {
    toggleFavoriteMovie(
      id,
      isInArray(id, favoritesMovies),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeMovieFromFavorites(id));
    setMovies((prevMovies) => prevMovies?.filter((movie) => movie.id !== id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <Grid
      isLoading={isLoading}
      message={movies?.length === 0 ? 'There is nothing here' : undefined}
    >
      {movies &&
        movies.map((movie) => (
          <Item
            key={movie.id}
            id={movie.id}
            handleBtnClickCallback={handleToggleFavorites}
            tittle={movie.tittle}
            subtittle={movie.genre}
            caption={new Date(movie.creationDate).getFullYear().toString()}
            imgUrl={movie.logoUrl}
            isActive={isInArray(movie.id, favoritesMovies)}
            navigateTo={`${routes.movies}/${movie.id}`}
          />
        ))}
    </Grid>
  );
};

export default FavoritesMovies;
