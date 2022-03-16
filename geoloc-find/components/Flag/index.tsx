import Image from 'next/image';

import { countries } from './countries';
import styles from './Flag.module.css';

type Props = {
  countryCode: string; // alpha 2
  width: number;
  height: number;
};

const Flag = ({ countryCode, width, height }: Props) => {
  const countryNumericCode = countries?.[countryCode]?.numericCode;
  const flagFileName = countryNumericCode + ".svg";

  return (
    <>
      {countryNumericCode ? (
        <Image className={styles.flag} src={`/flags/${flagFileName}`} width={width} height={height} layout="fixed" />
      ) : null}
    </>
  );
};

export default Flag;
