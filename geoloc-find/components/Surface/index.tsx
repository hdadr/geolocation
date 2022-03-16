import styles from './Surface.module.css';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  elevation: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  children: React.ReactNode;
};

const elevationToOverlayLevel = {
  0: 0,
  1: 0.05,
  2: 0.07,
  3: 0.08,
  4: 0.09,
  5: 0.11,
  6: 0.12,
  7: 0.14,
  8: 0.15,
  9: 0.16,
};

export function Surface({ elevation, children, ...rest }: Props) {
  return (
    <div {...rest} className={styles.container} style={{ backgroundColor: `rgba(255, 255, 255, ${elevationToOverlayLevel[elevation]}` }}>
      {children}
    </div>
  );
}
