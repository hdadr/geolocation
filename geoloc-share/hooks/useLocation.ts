import { useEffect, useState } from 'react';

import { Address } from '../models/Address';
import { Coords } from '../models/Coords';
import { Location } from '../models/Location';
import { getAddressFromCoords } from '../utils/geocoding';

export const useLocation = () => {
  const [location, setLocation] = useState<Location>();

  const updateLocation = () => {
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getAddressFromCoords(position.coords.latitude, position.coords.longitude)
            .then((address) => {
              const safeAddress: Address = {
                city: address.city ?? "-",
                country: address.country ?? "-",
                countryCode: address.countryCode ?? "-",
                county: address.county ?? "-",
                road: address.road ?? "-",
              };
              setLocation(mapToLocation(position, safeAddress));
            })
            .catch(() => setLocation(mapToLocation(position)));
        },
        () => {
          //TODO error handling
        }
      );
    }
  };

  useEffect(updateLocation, []);

  return { location, updateLocation } as const;
};

// GeolocationPosition is not serializeable
const mapToLocation = (position: GeolocationPosition, address?: Address): Location => {
  const coords: Coords = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
  };

  return {
    coords,
    address,
    timestamp: Number(position.timestamp),
  };
};
