import images from '@src/constants/images';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loadingWrapper}>
      <img
        className={styles.loadingIcon}
        src={images.loadingIcon}
        alt="loading"
      />
    </div>
  );
};

export default Loader;
