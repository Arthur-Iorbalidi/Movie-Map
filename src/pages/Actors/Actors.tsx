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
  changeActorsPage,
  changeActorsSearch,
  changeActorsSort,
  changeActorsSortOrder,
  resetActorsPage,
} from '@src/store/slices/searchSlice';
import {
  addActorToFavorites,
  removeActorFromFavorites,
} from '@src/store/slices/userSlice';
import { IActorsResponse } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Actors.module.scss';

const Actors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesActors = useAppSelector(
    (state) => state.userReducer.userInfo?.actors,
  );

  const [actors, setActors] = useState<IActorsResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.actors);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getActors(params);
      setActors(data);
      setIsLoading(false);
    })();
  }, [params]);

  const isInFavorites = (id: number) => {
    if (favoritesActors) {
      return favoritesActors.some((actor) => actor.id === id);
    }
    return false;
  };

  const toggleFavorites = (id: number) => {
    if (isInFavorites(id)) {
      serverAPI.removeActorFromFavorites(id, succesRemove, unathorizedCallback);
    } else {
      serverAPI.addActorToFavorites(id, succesAdd, unathorizedCallback);
    }
  };

  const succesAdd = (id: number) => {
    dispatch(addActorToFavorites(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeActorFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeActorsSearch(search));
    dispatch(resetActorsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeActorsPage(params.page + count));
  };

  const handleChangeSorting = (sortOption: ISortOption) => {
    dispatch(changeActorsSort(sortOption.value.sortBy));
    dispatch(changeActorsSortOrder(sortOption.value.sortOrder));
  };

  return (
    <section className={styles.actors_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search}
        />

        <Sorting
          sortOptions={sortOptions.actors}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Actors</h2>

        <Grid isLoading={isLoading}>
          {actors &&
            actors.data.map((actor) => (
              <Item
                key={actor.id}
                id={actor.id}
                handleBtnClickCallback={toggleFavorites}
                tittle={`${actor.name} ${actor.surname}`}
                subtittle={calculateAge(actor.birthday, actor.dateOfDeath)}
                imgUrl={actor.imgUrl}
                isActive={isInFavorites(actor.id)}
                navigateTo={`${routes.actors}/${actor.id}`}
              />
            ))}
        </Grid>

        {actors?.pagination && (
          <Pagination
            pagination={actors?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Actors;
