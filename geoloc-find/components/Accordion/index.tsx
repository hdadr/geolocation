import Image from 'next/image';
import { createRef, useEffect } from 'react';

import { useToggle } from '../../hooks/useToggle';
import { Location } from '../../models/Location';
import mapIcon from '../../public/icons/map.png';
import { Surface } from '../Surface';
import styles from './Accordion.module.css';
import AccordionHeader from './AccordionHeader';
import DisplayAddress from './DisplayAddress';
import DisplayCoords from './DisplayCoords';

type Props = {
  location: Location;
  serial: number;
  setSelectedLocation: (locationId: string) => void;
};

const Accordion = ({ location, serial, setSelectedLocation }: Props) => {
  const [open, toggleOpen] = useToggle();

  return (
    <Surface onClick={() => setSelectedLocation(location.id)} elevation={1}>
      <AccordionHeader location={location} serial={serial} open={open} onArrowClick={toggleOpen} />
      {open ? (
        <div className={styles.content}>
          <DisplayAddress address={location.address} />
          <DisplayCoords coords={location.coords} />
          <a
            className={styles.map}
            href={`https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`}
            target="_blank"
            rel="noopener noreferrer">
            <Image src={mapIcon} height={20} width={20} /> Google Map
          </a>
        </div>
      ) : null}
    </Surface>
  );
};

export default Accordion;
