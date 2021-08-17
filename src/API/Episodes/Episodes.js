import { request } from '../api';

export const getEpisodes = async(endPoint) => {
  const allEpisodes = await request(`/episode${endPoint || ''}`);

  return allEpisodes;
};
