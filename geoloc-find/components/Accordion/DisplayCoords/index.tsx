import { Coords } from '../../../models/Location';
import KeyValue from '../../KeyValue';
import styles from './DisplayCoords.module.css';

type Props = {
  coords: Coords;
};

const DisplayCoords = ({ coords }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div>
            <KeyValue keyTitle="Latitdue" value={coords.latitude} smallKey />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <KeyValue keyTitle="Longitude" value={coords.longitude} smallKey />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <div>
            <KeyValue keyTitle="Accuracy" value={coords.accuracy?.toFixed(2) + " m"} smallKey />
          </div>
        </div>
        <div className={styles.column}>
          <div>{coords.altitude ? <KeyValue keyTitle="Altitude" value={coords.altitude?.toFixed(2) + " m"} smallKey /> : null}</div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <div>{coords.heading ? <KeyValue keyTitle="Heading (to north)" value={coords.heading?.toFixed(2) + "°"} smallKey /> : null}</div>
        </div>
        <div className={styles.column}>
          <div>{coords.speed ? <KeyValue keyTitle="Speed" value={(coords.speed * 3.6).toFixed(2) + " km/h"} smallKey /> : null}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCoords;
