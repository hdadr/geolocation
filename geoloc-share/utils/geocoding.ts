import { Address } from '../models/Address';

export const getAddressFromCoords = (latidude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latidude}&lon=${longitude}&format=json`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { city, country, country_code, county, road } = data.address;

      return {
        city,
        county,
        country,
        road,
        countryCode: country_code,
      } as Address;
    });
};
