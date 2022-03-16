import styles from './KeyValue.module.css';

type Props = {
  keyTitle: string;
  value?: string | number | undefined | null;
  children?: any;
  direction?: "row" | "column";
};

export default function KeyValue({ keyTitle, value, children, direction = "row" }: Props) {
  return (
    <div
      className={styles.content}
      style={direction === "column" ? { display: "flex", flexDirection: "column", alignItems: "center" } : {}}>
      <span>{keyTitle + ": "}</span>
      <span className={styles.value}>{value ?? children}</span>
    </div>
  );
}
