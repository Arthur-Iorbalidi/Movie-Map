import styles from './Button.module.scss';

interface IProps {
  value: string;
  type?: 'reset' | 'submit' | 'button';
  className?: string;
  onClick?: (val?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ value, type = 'button', className, onClick }: IProps) => {
  const handleBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={`${styles.btn} ${className ? className : ''}`}
      onClick={handleBtnClick}
    >
      {value}
    </button>
  );
};

export default Button;
