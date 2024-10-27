import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  addActorToFavorites,
  removeActorFromFavorites,
} from '@src/store/slices/userSlice';
import { IActor } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteActor } from '@src/utils/toggleFavorites';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedActor.module.scss';

const DetailedActor = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const favoritesActors = useAppSelector(
    (state) => state.userReducer.userInfo?.actors,
  );

  const [actor, setActor] = useState<IActor | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getActor(Number(id), errorCallback);
      setActor(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addActorToFavorites(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeActorFromFavorites(id));
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

    toggleFavoriteActor(
      actor!.id,
      isInArray(actor!.id, favoritesActors),
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
      {actor && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.artwork_img}
                src={actor.imgUrl}
                alt="actor"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(actor.id, favoritesActors)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2
                  className={styles.tittle}
                >{`${actor.name} ${actor.surname}`}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_tittle}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Age:</span>
                  <span className={styles.overview_item_value}>
                    {`${calculateAge(actor.birthday, actor.dateOfDeath)} years`}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Birthday:</span>
                  <span className={styles.overview_item_value}>
                    {actor.birthday}
                  </span>
                </p>
                {actor.dateOfDeath && (
                  <p className={styles.overview_item}>
                    <span className={styles.overview_item_tittle}>
                      Date of death:
                    </span>
                    <span className={styles.overview_item_value}>
                      {actor.dateOfDeath}
                    </span>
                  </p>
                )}
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>
                    Place of birth:
                  </span>
                  <span className={styles.overview_item_value}>
                    {actor.placeOfBirth}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Height:</span>
                  <span className={styles.overview_item_value}>
                    {actor.height}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_tittle}>Movies:</span>
                  <span className={styles.overview_item_value}>
                    {actor.movies?.map((movie, index) => (
                      <Fragment key={movie.id}>
                        <Link
                          className={styles.overview_item_value_link}
                          to={`${routes.movies}/${movie.id}`}
                        >
                          {movie.tittle}
                        </Link>
                        {index < actor.movies!.length - 1 && ', '}
                      </Fragment>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.description_wrapper}>
            <h2 className={styles.description_tittle}>Description</h2>
            <div className={styles.description}>{actor.description}</div>
          </div>
        </div>
      )}
      {error && <Message message={error} />}
    </section>
  );
};

export default DetailedActor;
