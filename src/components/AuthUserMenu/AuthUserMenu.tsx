import routes from '@src/constants/routes';
import useClickOutside from '@src/hooks/useClickOutside';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthUserMenu.module.scss';

interface IProps {
  toggleAuthUserMenu: () => void;
  isAuthUserMenuOpened: boolean;
}

const BurgerMenu = ({ toggleAuthUserMenu, isAuthUserMenuOpened }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    toggleAuthUserMenu();
  }, [toggleAuthUserMenu]);

  useClickOutside(menuRef, handleClickOutside);

  return (
    <>
      {isAuthUserMenuOpened && (
        <nav className={styles.burger_menu} ref={menuRef}>
          <ul className={styles.burger_menu_list}>
            <li>
              <Link
                to={routes.account}
                className={styles.link}
                onClick={toggleAuthUserMenu}
              >
                <span className={styles.link_text}>Account</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.favorites}
                className={styles.link}
                onClick={toggleAuthUserMenu}
              >
                <span className={styles.link_text}>Favorites</span>
              </Link>
            </li>
            <li>
              <button className={styles.link} onClick={toggleAuthUserMenu}>
                <span className={styles.link_text}>Log out</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default BurgerMenu;
