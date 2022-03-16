import Image from 'next/image';

import { Location } from '../../models/Location';
import mapIcon from '../../public/icons/map.png';
import Flag from '../Flag';
import KeyValue from '../KeyValue';
import { Surface } from '../Surface';
import styles from './DeviceLocation.module.css';

type Props = {
  location: Location | undefined;
};

export default function DeviceLocation({ location }: Props) {
  const longitude = location?.coords?.longitude;
  const latitude = location?.coords?.latitude;
  const datetime = new Date(location?.timestamp ?? 0).toLocaleString("hu-HU");

  return (
    <Surface elevation={1}>
      <div className={styles.card}>
        <div className={styles.title}>Location</div>

        <div className={styles.content}>
          {location ? (
            <div className={styles.content}>
              <KeyValue keyTitle="Longitude" value={longitude?.toString()} />
              <KeyValue keyTitle="Latidue" value={latitude?.toString()} />
              <KeyValue keyTitle="Datetime" value={datetime} />

              {location.address ? (
                <>
                  <KeyValue keyTitle="Country">
                    <Flag countryCode={location.address.countryCode} width={16} height={12} /> {location.address.country}
                  </KeyValue>
                  <KeyValue keyTitle="City" value={location.address.city} />
                  <KeyValue keyTitle="Road" value={location.address.road} />
                </>
              ) : null}

              <a href={`https://maps.google.com/?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
                <Image src={mapIcon} width={16} height={16} /> Map
              </a>
            </div>
          ) : (
            <div>Cannot access the location info!</div>
          )}
        </div>
      </div>
    </Surface>
  );
}
