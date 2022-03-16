import { Address } from './Address';
import { Coords } from './Coords';

export interface Location {
  coords: Coords;
  address?: Address;
  timestamp: number;
}
