import { Icon } from 'leaflet';

type IconOptions = {
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  shadowSize: [number, number];
  shadowAnchor: [number, number];
};

const createMarkerIcon = (iconUrl: string, shadowUrl: string, options: IconOptions) => {
  return new Icon({
    iconUrl,
    shadowUrl,
    ...options,
  });
};

const shadowUrl = "/icons/marker-shadow.png";

const smallIconOptions: IconOptions = {
  iconSize: [30, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-10, -50],
  shadowSize: [24, 24],
  shadowAnchor: [18, 24],
};

const largeIconOptions: IconOptions = {
  iconSize: [40, 64],
  iconAnchor: [20, 64],
  popupAnchor: [0, -65],
  shadowSize: [60, 60],
  shadowAnchor: [18, 60],
};

export const yellowMarkerIcon = createMarkerIcon("/icons/marker-icon-yellow.png", shadowUrl, smallIconOptions);
export const orangeMarkerIcon = createMarkerIcon("/icons/marker-icon-orange.png", shadowUrl, smallIconOptions);
export const greenMarkerIcon = createMarkerIcon("/icons/marker-icon-green.png", shadowUrl, smallIconOptions);

export const redLargeMarkerIcon = createMarkerIcon("/icons/marker-icon-red.png", shadowUrl, largeIconOptions);
