import Image from 'next/image';

import loadingIndicator from '../../public/loading.svg';
import styles from './Button.module.css';

type Props = {
  children: string;
  onClick: () => void;
  loading?: boolean;
};

export default function Button({ children, onClick, loading }: Props) {
  return (
    <button onClick={onClick} className={styles.button}>
      {loading ? <Image src={loadingIndicator} width={16} height={16} /> : <>{children}</>}
    </button>
  );
}
