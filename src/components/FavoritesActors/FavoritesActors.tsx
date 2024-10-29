import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import { removeActorFromFavorites } from '@src/store/slices/userSlice';
import { IActor } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import getShortPeriodOfLife from '@src/utils/getPeriodOfLife';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteActor } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid from '../Grid/Grid';
import Item from '../Item/Item';

const FavoritesActors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesActors = useAppSelector(
    (state) => state.userReducer.userInfo?.actors,
  );

  const [actors, setActors] = useState<IActor[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFavoriteActors();
      setActors(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorites = (id: number) => {
    toggleFavoriteActor(
      id,
      isInArray(id, favoritesActors),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeActorFromFavorites(id));
    setActors((prev) => prev?.filter((elem) => elem.id !== id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <Grid
      isLoading={isLoading}
      message={actors?.length === 0 ? 'There is nothing here' : undefined}
    >
      {actors &&
        actors.map((actor) => (
          <Item
            key={actor.id}
            id={actor.id}
            handleBtnClickCallback={handleToggleFavorites}
            tittle={`${actor.name} ${actor.surname}`}
            subtittle={
              actor.dateOfDeath
                ? `${getShortPeriodOfLife(actor.birthday, actor.dateOfDeath)} (${calculateAge(actor.birthday, actor.dateOfDeath)} years)`
                : `${calculateAge(actor.birthday, actor.dateOfDeath)} years`
            }
            image={actor.image}
            isActive={isInArray(actor.id, favoritesActors)}
            navigateTo={`${routes.actors}/${actor.id}`}
          />
        ))}
    </Grid>
  );
};

export default FavoritesActors;
