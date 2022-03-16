import { useMap } from 'react-leaflet';

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.panTo(center);
  return null;
};

export default RecenterMap;
