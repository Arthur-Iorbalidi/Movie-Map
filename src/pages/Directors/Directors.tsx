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
  changeDirectorsPage,
  changeDirectorsSearch,
  changeDirectorsSort,
  changeDirectorsSortOrder,
  resetDirectorsPage,
} from '@src/store/slices/searchSlice';
import {
  addDirectorToFavorites,
  removeDirectorFromFavorites,
} from '@src/store/slices/userSlice';
import { IDirectorsResponse } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Directors.module.scss';

const Directors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesDirectors = useAppSelector(
    (state) => state.userReducer.userInfo?.directors,
  );

  const [directors, setDirectors] = useState<IDirectorsResponse | undefined>(
    undefined,
  );

  const params = useAppSelector((state) => state.searchReducer.directors);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getDirectors(params);
      setDirectors(data);
      setIsLoading(false);
    })();
  }, [params]);

  const isInFavorites = (id: number) => {
    if (favoritesDirectors) {
      return favoritesDirectors.some((director) => director.id === id);
    }
    return false;
  };

  const toggleFavorites = (id: number) => {
    if (isInFavorites(id)) {
      serverAPI.removeDirectorFromFavorites(
        id,
        succesRemove,
        unathorizedCallback,
      );
    } else {
      serverAPI.addDirectorToFavorites(id, succesAdd, unathorizedCallback);
    }
  };

  const succesAdd = (id: number) => {
    dispatch(addDirectorToFavorites(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeDirectorFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeDirectorsSearch(search));
    dispatch(resetDirectorsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeDirectorsPage(params.page + count));
  };

  const handleChangeSorting = (sortOption: ISortOption) => {
    dispatch(changeDirectorsSort(sortOption.value.sortBy));
    dispatch(changeDirectorsSortOrder(sortOption.value.sortOrder));
  };

  return (
    <section className={styles.directors_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search}
        />

        <Sorting
          sortOptions={sortOptions.directors}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Directors</h2>

        <Grid isLoading={isLoading}>
          {directors &&
            directors.data.map((director) => (
              <Item
                key={director.id}
                id={director.id}
                handleBtnClickCallback={toggleFavorites}
                tittle={`${director.name} ${director.surname}`}
                subtittle={calculateAge(
                  director.birthday,
                  director.dateOfDeath,
                )}
                imgUrl={director.imgUrl}
                isActive={isInFavorites(director.id)}
                navigateTo={`${routes.directors}/${director.id}`}
              />
            ))}
        </Grid>

        {directors?.pagination && (
          <Pagination
            pagination={directors?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Directors;
