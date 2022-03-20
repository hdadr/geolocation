import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { Location } from '../../models/Location';
import styles from './LocationMap.module.css';
import Markers from './Markers';
import RecenterMap from './RecenterMap';

type Props = {
  locations: Location[];
  selectedLocationId: string | undefined;
  setSelectedLocationId: (id: string) => void;
};

const getNewCenter = (locations: Location[], selectedLocationId: string): [number, number] | undefined => {
  const selectedLocation = locations.find((location) => location.id === selectedLocationId);
  if (!selectedLocation) return;

  const newCenter: [number, number] = [selectedLocation.coords.latitude, selectedLocation.coords.longitude];
  return newCenter;
};

const LocationMap = ({ locations, selectedLocationId, setSelectedLocationId }: Props) => {
  const defaultCenter: [number, number] = [locations[0].coords.latitude, locations[0].coords.longitude];
  const [center, setCenter] = useState<[number, number]>(defaultCenter);

  useEffect(() => {
    if (selectedLocationId) {
      setCenter(getNewCenter(locations, selectedLocationId) ?? center);
    }
  }, [selectedLocationId]);

  return (
    <MapContainer center={center} zoom={11} className={styles.map}>
      <RecenterMap center={center} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers setSelectedLocationId={setSelectedLocationId} locations={locations} selectedLocationId={selectedLocationId} />
    </MapContainer>
  );
};

export default LocationMap;
