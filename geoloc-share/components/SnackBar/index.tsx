import { useEffect } from 'react';

import styles from './SnackBar.module.css';

export interface Snackbar {
  show: boolean;
  type: "success" | "error" | "info";
  text: string;
}

type Props = {
  type?: "success" | "error" | "info";
  show: boolean;
  timeout?: number; //ms
  text: string;
  onClose: () => void;
};

export default function SnackBar({ type = "success", show, timeout = 3000, text = "snackbar", onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, timeout);
    return () => clearTimeout(timer);
  });

  return (
    <div className={`${styles.container} ${styles[type]} ${!show ? styles.hide : null}`}>
      <div className={styles.content}>{text}</div>
    </div>
  );
}
