import { Address } from './Address';

export interface Coords {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}

export interface Location {
  coords: Coords;
  address: Address;
  timestamp: number;
  id: string;
}
