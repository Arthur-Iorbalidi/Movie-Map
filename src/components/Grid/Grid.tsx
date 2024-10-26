import Loader from '@src/components/ui/Loader/loader';
import Message from '@src/components/ui/Message/Message';
import { memo, ReactNode } from 'react';

import styles from './Grid.module.scss';

export enum LayoutType {
  threeColumns,
  twoColumns,
}

interface IProps {
  children: ReactNode;
  isLoading: boolean;
  message?: string;
  layoutType?: LayoutType;
}

const Artworks = ({
  children,
  message,
  isLoading,
  layoutType = LayoutType.threeColumns,
}: IProps) => {
  const classNameSwitcher = () => {
    switch (layoutType) {
      case LayoutType.threeColumns:
        return styles.threeColumns;
      case LayoutType.twoColumns:
        return styles.twoColumns;
      default:
        return styles.threeColumns;
    }
  };

  return (
    <div className={`${styles.grid} ${classNameSwitcher()}`}>
      {isLoading && <Loader />}
      {children}
      {message && <Message message={message} />}
    </div>
  );
};

export default memo(Artworks);
