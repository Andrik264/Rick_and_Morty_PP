import { request } from '../api';

export const getCharacters = async(endPoint) => {
  const allCharacters = await request(`/character${endPoint || ''}`);

  return allCharacters;
};
