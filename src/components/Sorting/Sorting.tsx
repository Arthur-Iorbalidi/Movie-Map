import { ISortOption } from '@src/constants/sortOptions';

import styles from './Sorting.module.scss';

interface IProps {
  sortOptions: ISortOption[];
  currentSortOptionIndex: number;
  handleChangeSorting: (sortOption: ISortOption) => void;
}

const Sorting = ({
  sortOptions,
  currentSortOptionIndex,
  handleChangeSorting,
}: IProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeSorting(sortOptions[Number(event.target.value)]);
  };

  return (
    <div className={styles.select_wrapper}>
      <select
        className={styles.select}
        name="sorting"
        onChange={onChange}
        value={currentSortOptionIndex}
      >
        {sortOptions.map((sortOption, index) => (
          <option value={index} key={sortOption.tittle}>
            {sortOption.tittle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
