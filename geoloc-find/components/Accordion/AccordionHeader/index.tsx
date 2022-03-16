import Image from 'next/image';
import { createRef, useEffect } from 'react';

import { Location } from '../../../models/Location';
import downIcon from '../../../public/icons/downIcon.svg';
import upIcon from '../../../public/icons/upIcon.svg';
import Flag from '../../Flag';
import styles from './AccordionHeader.module.css';

type Props = {
  location: Location;
  serial: number;
  open: boolean;
  onArrowClick: () => void;
};

const formatDate = (timestamp: number) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Intl.DateTimeFormat("hu-HU", dateOptions).format(new Date(timestamp));
  const time = new Intl.DateTimeFormat("hu-HU", timeOptions).format(new Date(timestamp));

  return [date, time];
};

const AccordionHeader = ({ location, serial, open, onArrowClick: handleLocationClick }: Props) => {
  const [date, time] = formatDate(location.timestamp);

  const coordsRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (open) {
      coordsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [open]);

  return (
    <div ref={coordsRef} className={styles.container}>
      <div className={styles.serial}>{serial}</div>
      <div className={styles.datetime}>
        <div>{date}</div>
        <div>{time}</div>
      </div>
      <div className={styles.country}>
        <Flag countryCode={location.address.countryCode} width={20} height={16} />
        {location.address.country}
      </div>
      <div className={styles.dropdown} onClick={handleLocationClick}>
        {open ? <Image src={upIcon} height={20} width={20} /> : <Image src={downIcon} height={20} width={20} />}
      </div>
    </div>
  );
};

export default AccordionHeader;
