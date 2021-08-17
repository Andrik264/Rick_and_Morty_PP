import { request } from '../api';

export const getLocations = async(endPoint) => {
  const allLocations = await request(`/location${endPoint || ''}`);

  return allLocations;
};
