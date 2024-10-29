import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeDirectorFromFavorites } from '@src/store/slices/userSlice';
import { IDirector } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import getShortPeriodOfLife from '@src/utils/getPeriodOfLife';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteDirector } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid from '../Grid/Grid';
import Item from '../Item/Item';

const FavoritesDirectors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesDirectors = useAppSelector(
    (state) => state.userReducer.userInfo?.directors,
  );

  const [directors, setDirectors] = useState<IDirector[] | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFavoriteDirectors();
      setDirectors(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorites = (id: number) => {
    toggleFavoriteDirector(
      id,
      isInArray(id, favoritesDirectors),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeDirectorFromFavorites(id));
    setDirectors((prev) => prev?.filter((elem) => elem.id !== id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <Grid
      isLoading={isLoading}
      message={directors?.length === 0 ? 'There is nothing here' : undefined}
    >
      {directors &&
        directors.map((director) => (
          <Item
            key={director.id}
            id={director.id}
            handleBtnClickCallback={handleToggleFavorites}
            tittle={`${director.name} ${director.surname}`}
            subtittle={
              director.dateOfDeath
                ? `${getShortPeriodOfLife(director.birthday, director.dateOfDeath)} (${calculateAge(director.birthday, director.dateOfDeath)} years)`
                : `${calculateAge(director.birthday, director.dateOfDeath)} years`
            }
            image={imageAPI.getImage(director.image!)}
            isActive={isInArray(director.id, favoritesDirectors)}
            navigateTo={`${routes.directors}/${director.id}`}
          />
        ))}
    </Grid>
  );
};

export default FavoritesDirectors;
