import Image from 'next/image';
import { Marker, Popup } from 'react-leaflet';

import { Location } from '../../../models/Location';
import mapIcon from '../../../public/icons/map.png';
import { greenMarkerIcon, redLargeMarkerIcon } from './markerIcons';

type Props = {
  locations: Location[];
  selectedLocationId: string | undefined;
  setSelectedLocationId: (id: string) => void;
};

const assignIcon = (id: string, selectedLocationId?: string) => {
  const locationSelected = id === selectedLocationId;
  if (locationSelected) return redLargeMarkerIcon;

  return greenMarkerIcon;
};

const Markers = ({ locations, selectedLocationId, setSelectedLocationId }: Props) => {
  return (
    <>
      {locations.map(({ id, coords, timestamp }, index) => {
        return (
          <Marker icon={assignIcon(id, selectedLocationId)} key={id} position={[coords.latitude, coords.longitude]}>
            <Popup onOpen={() => setSelectedLocationId(id)}>
              {locations.length - index} <br />
              Date: {new Date(timestamp).toLocaleString("hu-HU")}
              <br />
              <a href={`https://maps.google.com/?q=${coords.latitude},${coords.longitude}`} target="_blank" rel="noopener noreferrer">
                <Image src={mapIcon} height={20} width={20} /> Google Map
              </a>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default Markers;
