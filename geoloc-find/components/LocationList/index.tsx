import { createRef, Ref, useEffect } from 'react';

import { Location } from '../../models/Location';
import Accordion from '../Accordion';
import styles from './LocationList.module.css';

type Props = {
  locations: Location[] | undefined;
  selectedLocationId: string;
  setSelectedLocationId: (locationId: string) => void;
};

const LocationList = ({ locations, selectedLocationId, setSelectedLocationId }: Props) => {
  const locationsWithRefs = locations?.map((location) => ({ ...location, ref: createRef<HTMLDivElement>() }));

  const scrollSelectedLocationIntoView = () => {
    const selectedLocation = locationsWithRefs?.find((location) => location.id === selectedLocationId);
    if (!selectedLocation) return;

    selectedLocation.ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  useEffect(() => {
    scrollSelectedLocationIntoView();
  }, [selectedLocationId]);

  return (
    <div className={styles.locations}>
      {locationsWithRefs?.map((location, index) => {
        return (
          <div
            ref={location.ref}
            key={location?.id}
            className={styles.accordionContainer}
            style={location.id === selectedLocationId ? { border: "1px solid rgba(255,255,255, 0.3)" } : {}}>
            <Accordion location={location} serial={locationsWithRefs.length - index} setSelectedLocation={setSelectedLocationId} />
          </div>
        );
      })}
    </div>
  );
};

export default LocationList;
