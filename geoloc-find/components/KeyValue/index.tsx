import styles from './KeyValue.module.css';

type Props = {
  keyTitle: string;
  value: string | number | undefined | null;
  direction?: "row" | "column";
  smallKey?: boolean;
};

export default function KeyValue({ keyTitle, value, direction = "column", smallKey }: Props) {
  return (
    <div
      className={styles.content}
      style={direction === "column" ? { display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.3 } : {}}>
      <span style={smallKey ? { fontSize: "0.9rem" } : {}}>{keyTitle + ": "}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
