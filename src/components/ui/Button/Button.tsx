import styles from './Button.module.scss';

interface IProps {
  value: string;
}

const Button = ({ value }: IProps) => {
  return <button className={styles.btn}>{value}</button>;
};

export default Button;
