import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from '@src/store/slices/userSlice';
import { IMovie } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteMovie } from '@src/utils/toggleFavorites';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedMovie.module.scss';

const DetailedMovie = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movie, setMovie] = useState<IMovie | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getMovie(Number(id), errorCallback);
      setMovie(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addMovieToFavorites(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeMovieFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const errorCallback = (message: string) => {
    setError(message);
  };

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    toggleFavoriteMovie(
      movie!.id,
      isInArray(movie!.id, favoritesMovies),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className={styles.detailed_page}>
      {isLoading && <Loader />}
      {movie && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.artwork_img}
                src={movie.logoUrl}
                alt="movie"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(movie.id, favoritesMovies)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.tittle}>{movie.tittle}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_tittle}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>
                    Creation Date:
                  </span>
                  <span className={styles.overview_item_value}>
                    {movie.creationDate}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>genre:</span>
                  <span className={styles.overview_item_value}>
                    {movie.genre}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Budget:</span>
                  <span className={styles.overview_item_value}>
                    {`$${movie.budget}`}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Director:</span>
                  <span className={styles.overview_item_value}>
                    {movie.directors?.map((director, index) => (
                      <Fragment key={director.id}>
                        <Link
                          className={styles.overview_item_value_link}
                          key={director.id}
                          to={`${routes.directors}/${director.id}`}
                        >{`${director.name} ${director.surname}`}</Link>
                        {index < movie.actors!.length - 1 && ', '}
                      </Fragment>
                    ))}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Actors:</span>
                  <span className={styles.overview_item_value}>
                    {movie.actors?.map((actor, index) => (
                      <Fragment key={actor.id}>
                        <Link
                          className={styles.overview_item_value_link}
                          to={`${routes.actors}/${actor.id}`}
                        >
                          {`${actor.name} ${actor.surname}`}
                        </Link>
                        {index < movie.actors!.length - 1 && ', '}
                      </Fragment>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.description_wrapper}>
            <h2 className={styles.description_tittle}>Description</h2>
            <div className={styles.description}>{movie.description}</div>
          </div>
        </div>
      )}
      {error && <Message message={error} />}
    </section>
  );
};

export default DetailedMovie;
