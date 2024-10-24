import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import { Link } from 'react-router-dom';

import styles from './Artwork.module.scss';

export enum Appearance {
  vertical,
  horizontal,
}

interface IProps {
  // artwork: IArtwork;
  appearance?: Appearance;
  handleRemove?: (id: number) => void;
}

const Artwork = ({
  // artwork,
  handleRemove,
  appearance = Appearance.vertical,
}: IProps) => {
  const [isInFavorites, setIsInFavorites] = useState(
    favouritesAPI.isInFavorites(artwork.id),
  );

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (isInFavorites) {
      favouritesAPI.removeFromFavourites(artwork.id);
      setIsInFavorites(false);

      handleRemove?.(artwork.id);
    } else {
      favouritesAPI.addToFavourites(artwork.id);
      setIsInFavorites(true);
    }
  };

  const classNameSwitcher = () => {
    switch (appearance) {
      case Appearance.horizontal:
        return styles.horizontal;
      case Appearance.vertical:
        return styles.vertical;
      default:
        return styles.vertical;
    }
  };

  return (
    <Link
      to={`${routes.home}/${artwork.id}`}
      className={`${styles.artwork} ${classNameSwitcher()}`}
    >
      <div className={styles.img_wrapper}>
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt="artwork"
          className={styles.artwork_img}
          onError={(e) => {
            e.currentTarget.src = images.alternativeArtworkImg;
          }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.tittle}>{artwork.title}</p>
          <p className={styles.author}>{artwork.artist_title}</p>
        </div>
        <div className={styles.favorite_btn_wrapper}>
          <FavoriteButton
            isInFavorites={isInFavorites}
            onClick={handleToggleFavorite}
          />
        </div>
      </div>
    </Link>
  );
};

export default Artwork;
